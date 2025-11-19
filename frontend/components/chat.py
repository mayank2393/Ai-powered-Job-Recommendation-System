import streamlit as st
from api_client import chat_to_bot
from typing import Optional, Any, Dict, List


def _extract_answer_text(resp: Dict[str, Any]) -> str:
    """
    Robust extractor for many backend shapes:
    - {"answer": "plain text", ...}
    - {"answer": {"answer_summary": "...", ...}, ...}
    - {"answer_json": {...}, ...}
    - older shapes with nested dicts
    Returns a human-friendly string to show in the chat.
    """
    if not isinstance(resp, dict):
        return "No response."

    # Case A: answer is a plain string
    if "answer" in resp and isinstance(resp["answer"], str):
        return resp["answer"]

    # Case B: answer is a dict (structured)
    if "answer" in resp and isinstance(resp["answer"], dict):
        a = resp["answer"]
        # most common key for summary
        if "answer_summary" in a and isinstance(a["answer_summary"], str):
            return a["answer_summary"]
        if "summary" in a and isinstance(a["summary"], str):
            return a["summary"]
        # fallback: try to create a readable string from career options/guidance
        parts: List[str] = []
        if "career_options" in a and isinstance(a["career_options"], list):
            for opt in a["career_options"][:3]:
                role = opt.get("role", "Role")
                why = opt.get("why_suitable", "")
                next_steps = opt.get("next_steps", [])
                parts.append(f"{role} — {why}")
                if next_steps:
                    parts.append("Next: " + "; ".join(next_steps[:3]))
        if "guidance" in a and isinstance(a["guidance"], list) and a["guidance"]:
            parts.append("Guidance: " + " • ".join(a["guidance"][:4]))
        if parts:
            return "\n\n".join(parts)
        # as last resort stringify the dict-ish answer
        return str(a)

    # Case C: legacy key answer_json
    if "answer_json" in resp and isinstance(resp["answer_json"], dict):
        a = resp["answer_json"]
        if "answer_summary" in a:
            return a["answer_summary"]
        return str(a)

    # Case D: sometimes backend returns 'answer_summary' at top-level
    if "answer_summary" in resp and isinstance(resp["answer_summary"], str):
        return resp["answer_summary"]

    # fallback: return any 'answer' like field if present
    for candidate in ("result", "text", "message"):
        if candidate in resp and isinstance(resp[candidate], str):
            return resp[candidate]

    return "No structured answer found."


def chatbot_section(candidate_skills: Optional[list] = None, skill_gap_jobs: Optional[list] = None):
    st.subheader("💬 Career Assistant Chatbot")

    if "session_id" not in st.session_state:
        st.session_state.session_id = ""

    msg = st.chat_input("Ask something about your career, jobs, skills...")

    if msg:
        st.chat_message("user").write(msg)

        # prepare job skills list for the chat payload (flatten)
        target_skills = None
        if skill_gap_jobs:
            # skill_gap_jobs may be list of dicts; extract skills arrays safely
            ts = []
            for j in skill_gap_jobs:
                sk = j.get("skills_required") or j.get("required_skills") or j.get("skills") or j.get("skills_required")
                if isinstance(sk, (list, tuple)):
                    ts.extend([s for s in sk if isinstance(s, str)])
                elif isinstance(sk, str):
                    ts.extend([s.strip() for s in sk.split(",") if s.strip()])
            target_skills = ts if ts else None

        resp = chat_to_bot(
            st.session_state.get("session_id", ""),
            msg,
            generate_plan=False,
            candidate=candidate_skills,
            target=target_skills,
            job_title=None
        )

        # update session id if returned
        if isinstance(resp, dict) and resp.get("session_id"):
            st.session_state.session_id = resp["session_id"]

        answer_text = _extract_answer_text(resp)
        st.chat_message("assistant").markdown(answer_text)
