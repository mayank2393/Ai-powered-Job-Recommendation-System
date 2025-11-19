import streamlit as st
from api_client import upload_resume
from typing import Any, Dict, List, Optional

def _extract_skills_from_response(resp: Any) -> Any:
    """
    Return:
      - list of skills (if found)
      - dict with error (if error)
      - [] if no skills found
    """
    if not resp:
        return []

    # API returned an error dict
    if isinstance(resp, dict) and "error" in resp:
        return {"error": resp["error"], "raw": resp.get("raw_text")}

    # If top-level "skills" exists
    if isinstance(resp, dict) and "skills" in resp and isinstance(resp["skills"], list):
        return [s for s in resp["skills"]]

    # Old shape: { "profile": { "skills": [...] } }
    if isinstance(resp, dict) and "profile" in resp and isinstance(resp["profile"], dict):
        prof = resp["profile"]
        if "skills" in prof and isinstance(prof["skills"], list):
            return [s for s in prof["skills"]]

    # nested search: find first list value named 'skills'
    if isinstance(resp, dict):
        for k, v in resp.items():
            if isinstance(v, dict) and "skills" in v and isinstance(v["skills"], list):
                return [s for s in v["skills"]]

    return []


def resume_upload_section() -> Optional[List[str]]:
    st.subheader("📤 Upload Resume")

    uploaded = st.file_uploader("Upload PDF Resume", type=["pdf"])
    if uploaded is None:
        return None

    if uploaded:
        with st.spinner("Extracting skills..."):
            resp = upload_resume(uploaded.read())

        # If error returned
        if isinstance(resp, dict) and "error" in resp:
            st.error("Resume parser error: " + str(resp["error"]))
            if "raw_text" in resp:
                st.code(str(resp["raw_text"])[:1000])
            return None

        skills_or_err = _extract_skills_from_response(resp)

        if isinstance(skills_or_err, dict) and skills_or_err.get("error"):
            st.error("Parser error: " + skills_or_err["error"])
            if skills_or_err.get("raw"):
                st.code(str(skills_or_err["raw"])[:1000])
            return None

        skills = skills_or_err if isinstance(skills_or_err, list) else []

        if not skills:
            st.warning("Resume parsed but no skills found. You can edit or enter skills manually.")
            # show parsed text if available
            if isinstance(resp, dict) and "raw_text" in resp:
                st.text_area("Extracted text preview", value=resp["raw_text"][:5000], height=200)
            # show manual input to let user fill skills
            manual = st.text_input("Enter skills manually (comma separated):", "")
            if manual:
                skills_manual = [s.strip() for s in manual.split(",") if s.strip()]
                if skills_manual:
                    st.success("Using manual skills.")
                    return skills_manual
            return []

        st.success("Resume processed!")
        st.write("Detected skills: ", ", ".join(skills))
        return skills

    return None
