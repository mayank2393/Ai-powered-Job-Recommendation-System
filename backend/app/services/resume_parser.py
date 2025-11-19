# backend/app/services/resume_parser_llm.py
import os
import json
import ast
import io
from typing import Optional
import pdfplumber

from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings


MODEL_NAME = "gemini-2.5-flash"  # using gemini 2.5 flash as requested


def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            pages = []
            for p in pdf.pages:
                text = p.extract_text()
                if text:
                    pages.append(text)
            return "\n\n".join(pages).strip()
    except Exception:
        # fallback: try naive decode (rare)
        try:
            return pdf_bytes.decode("utf-8", errors="ignore")
        except Exception:
            return ""


def get_llm():
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set in .env")
    return ChatGoogleGenerativeAI(model=MODEL_NAME, google_api_key=api_key, temperature=0.0)


SYSTEM_PROMPT = """
You are a resume parser. You will be given the full extracted text of a resume.
Your ONLY output must be a single valid JSON object (no prose, no explanation).
The JSON must exactly follow this schema (use null where data is missing):

{
  "name": null,
  "email": null,
  "phone": null,
  "summary": null,
  "skills": [],
  "education": [],
  "experience": [],
  "projects": [],
  "certifications": [],
  "location": null,
  "raw_text": null
}

Details on fields:
- name: full name if available.
- email: email address.
- phone: phone number string.
- summary: one-line professional summary / highlight.
- skills: list of skill strings (short, lowercase preferred).
- education: list of objects {degree, school, start_year, end_year, details}.
- experience: list of objects {title, company, start_date, end_date, description}.
- projects: list of objects {name, description, tech_stack}.
- certifications: list of strings.
- location: city/country if present.
- raw_text: include the original extracted text (for debugging).

Important rules:
1) Output MUST be valid JSON only. No extra commentary, no code fences, no markdown.
2) Keep lists of items concise. Use strings, not nested LLM prose.
3) Normalize common date formats but it's OK to return strings (e.g., "Jan 2020", "2020-05", "Present").
4) If a field is not present, use null (for scalar) or [] (for arrays).
5) Ensure "skills" are a list (even if empty).
6) Ensure the final JSON fits the schema above exactly.

Now parse the provided resume text into that JSON object.
"""

def parse_resume_from_pdf_bytes(pdf_bytes: bytes) -> dict:
    text = extract_text_from_pdf_bytes(pdf_bytes)
    return parse_text_resume(text)


def parse_text_resume(text: str) -> dict:
    llm = get_llm()

    prompt = f"""
{SYSTEM_PROMPT}

Resume Text:
\"\"\"{text}\"\"\"
"""

    # invoke the model
    resp = llm.invoke(prompt)
    raw = resp.content if hasattr(resp, "content") else str(resp)

    # Try strict JSON parse; fallback to literal_eval
    parsed = None
    try:
        parsed = json.loads(raw)
    except Exception:
        try:
            parsed = ast.literal_eval(raw)
        except Exception:
            # try to extract first {...} block
            start = raw.find("{")
            end = raw.rfind("}")
            if start != -1 and end != -1 and end > start:
                snippet = raw[start:end+1]
                try:
                    parsed = json.loads(snippet)
                except Exception:
                    try:
                        parsed = ast.literal_eval(snippet)
                    except Exception:
                        parsed = None

    # If still not parsed, return a safe fallback JSON with raw text included
    if not isinstance(parsed, dict):
        fallback = {
            "name": None,
            "email": None,
            "phone": None,
            "summary": None,
            "skills": [],
            "education": [],
            "experience": [],
            "projects": [],
            "certifications": [],
            "location": None,
            "raw_text": text[:20000]  # limit for safety
        }
        # include model raw output for debugging
        fallback["_raw_model_output"] = raw[:10000]
        return fallback

    # Ensure all keys exist and types are correct
    output = {
        "name": parsed.get("name") or None,
        "email": parsed.get("email") or None,
        "phone": parsed.get("phone") or None,
        "summary": parsed.get("summary") or None,
        "skills": parsed.get("skills") if isinstance(parsed.get("skills"), list) else [],
        "education": parsed.get("education") if isinstance(parsed.get("education"), list) else [],
        "experience": parsed.get("experience") if isinstance(parsed.get("experience"), list) else [],
        "projects": parsed.get("projects") if isinstance(parsed.get("projects"), list) else [],
        "certifications": parsed.get("certifications") if isinstance(parsed.get("certifications"), list) else [],
        "location": parsed.get("location") or None,
        "raw_text": parsed.get("raw_text") or text[:20000]
    }

    return output
