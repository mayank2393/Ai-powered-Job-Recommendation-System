# backend/app/services/rag_assistant.py
from typing import Dict, Any, List, Optional
import uuid

from langchain_google_genai import ChatGoogleGenerativeAI

from app.core.config import settings
from app.services.chat_memory import chat_memory
from app.services.rag_retriever import build_context_string
from app.services.learning_path_service import generate_learning_path

MODEL_NAME = "gemini-2.5-flash"  # using gemini 2.5 flash as requested


def get_llm():
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set in .env or environment.")

    llm = ChatGoogleGenerativeAI(
        model=MODEL_NAME,
        google_api_key=api_key,
        temperature=0.4,
    )
    return llm


def format_history_text(history) -> str:
    if not history:
        return "No previous conversation."
    lines = []
    for msg in history:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if role == "user":
            lines.append(f"User: {content}")
        else:
            lines.append(f"Assistant: {content}")
    return "\n".join(lines)


def chat_career_assistant(
    message: str,
    session_id: Optional[str],
    top_k: int = 5,
    generate_learning_path_flag: bool = False,
    candidate_skills: Optional[List[str]] = None,
    target_skills: Optional[List[str]] = None,
    job_title: Optional[str] = None,
) -> Dict[str, Any]:
    """
    RAG assistant that returns conversational text (no enforced JSON).
    """

    # Use stable docs testing session if none provided
    if not session_id or session_id.strip() == "":
        session_id = "docs-demo-session"

    # load history
    history = chat_memory.get_history(session_id)
    history_text = format_history_text(history)

    # RAG context
    context_text = build_context_string(message, top_k=top_k)

    # System instructions (conversational)
    system_instructions = """
You are a helpful, friendly AI career assistant. Answer the user's question in natural conversational English,
like ChatGPT. Use the provided relevant job & skill context where it helps, but do not invent facts.
Be concise, practical and provide actionable next steps when appropriate.
"""

    full_prompt = f"""
{system_instructions}

Conversation history:
{history_text}

Relevant job & skill context (from internal dataset):
{context_text}

User question:
{message}

Answer naturally — plain text only (no JSON wrapper, no special format).
"""

    # call LLM
    llm = get_llm()
    response = llm.invoke(full_prompt)
    answer_text = response.content if hasattr(response, "content") else str(response)

    # persist raw messages
    chat_memory.add_message(session_id, "user", message)
    chat_memory.add_message(session_id, "assistant", answer_text)

    # optional learning path
    learning_plan = None
    if generate_learning_path_flag and candidate_skills and target_skills:
        learning_plan = generate_learning_path(
            candidate_skills=candidate_skills,
            target_skills=target_skills,
            use_llm=True,  # you can change to False to use rule-based
            job_title=job_title,
        )

    return {
        "session_id": session_id,
        "answer": answer_text,         # plain conversational text
        "used_top_k": top_k,
        "learning_path": learning_plan,
    }
