import requests
from typing import Any, Dict, Optional

BASE_URL = "http://127.0.0.1:8000"   # change if backend runs elsewhere
TIMEOUT = 240  # seconds


def _post(path: str, json: Optional[dict] = None, files: Optional[dict] = None) -> Dict[str, Any]:
    url = f"{BASE_URL}{path}"
    try:
        if files:
            r = requests.post(url, files=files, timeout=TIMEOUT)
        else:
            r = requests.post(url, json=json or {}, timeout=TIMEOUT)
        r.raise_for_status()
        try:
            return r.json()
        except ValueError:
            return {"error": "Invalid JSON from server", "raw_text": r.text}
    except requests.RequestException as e:
        err = {"error": str(e)}
        # include server text if available
        if hasattr(e, "response") and e.response is not None:
            try:
                err["raw_text"] = e.response.text[:2000]
                err["status_code"] = e.response.status_code
            except Exception:
                pass
        return err


def upload_resume(file_bytes: bytes) -> Dict[str, Any]:
    files = {"file": ("resume.pdf", file_bytes, "application/pdf")}
    # endpoint used by backend: /resume/parse
    return _post("/resume/parse", files=files)


def get_recommended_jobs(skills: Any) -> Dict[str, Any]:
    """
    Accepts either string or list of skills.
    Backend accepts {"text": "<...>"} for recommend endpoint.
    """
    if isinstance(skills, (list, tuple)):
        payload = {"text": ", ".join(str(s).strip() for s in skills)}
    else:
        payload = {"text": str(skills)}
    return _post("/recommend", json=payload)


def run_skill_gap(candidate_skills: list, jobs: list) -> Any:
    """
    candidate_skills: list[str]
    jobs: list of job objects (as returned by your search/recommend)
    """
    body = {"candidate": {"candidate_skills": candidate_skills}, "jobs": jobs}
    # try both endpoints that might exist
    resp = _post("/skill-gap-simple/", json=body)
    # fallback to /skill-gap/ if not present or error
    if isinstance(resp, dict) and resp.get("error"):
        resp2 = _post("/skill-gap/", json=body)
        return resp2
    return resp


def chat_to_bot(
    session_id: Optional[str],
    message: str,
    generate_plan: bool = False,
    candidate: Optional[list] = None,
    target: Optional[list] = None,
    job_title: Optional[str] = None,
) -> Dict[str, Any]:
    payload = {
        "message": message,
        "session_id": session_id,
        "top_k": 5,
        "generate_learning_path": generate_plan,
        "candidate_skills": candidate,
        "target_skills": target,
        "job_title": job_title
    }
    return _post("/chat", json=payload)
