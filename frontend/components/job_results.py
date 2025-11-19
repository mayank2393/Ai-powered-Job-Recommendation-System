import streamlit as st
from api_client import get_recommended_jobs
from typing import Any, Dict, List

def _normalize_job_response(resp: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Handle different backend response shapes, return list of job dicts with keys:
      - job_id, job_title, company, role, description, required_skills, similarity_score, location, posting_date, experience_range, qualification_level, salary_range
    """
    if not isinstance(resp, dict):
        return []

    # 1) new shape: {"recommendations": [...]}
    if "recommendations" in resp and isinstance(resp["recommendations"], list):
        out = []
        for j in resp["recommendations"]:
            out.append({
                "job_id": j.get("job_id"),
                "job_title": j.get("job_title") or j.get("title") or j.get("job_title"),
                "company": j.get("company"),
                "role": j.get("role"),
                "description": j.get("description") or j.get("job_text") or "",
                "required_skills": j.get("required_skills") or j.get("skills") or j.get("skills_required") or [],
                "similarity_score": j.get("similarity_score") or j.get("score") or 0,
                "location": j.get("location"),
                "posting_date": j.get("posting_date") or j.get("Job Posting Date"),
                "experience_range": j.get("experience_range") or {"min": j.get("experience_min"), "max": j.get("experience_max")},
                "qualification_level": j.get("qualification_level") or j.get("qualification"),
                "salary_range": j.get("salary_range") or {"min": j.get("salary_min"), "max": j.get("salary_max")}
            })
        return out

    # 2) maybe backend returns list directly
    if isinstance(resp, list):
        out = []
        for j in resp:
            out.append({
                "job_id": j.get("job_id"),
                "job_title": j.get("job_title") or j.get("title"),
                "company": j.get("company"),
                "role": j.get("role"),
                "description": j.get("description") or j.get("job_text") or "",
                "required_skills": j.get("skills") or j.get("required_skills") or [],
                "similarity_score": j.get("similarity_score") or j.get("score") or 0,
            })
        return out

    # fallback: no recognized format
    return []


def show_job_recommendations(skills):
    st.subheader("🎯 Recommended Jobs")

    # Convert list → string for API (api_client handles both)
    resp = get_recommended_jobs(skills)

    if isinstance(resp, dict) and resp.get("error"):
        st.error("Recommendation API error: " + str(resp["error"]))
        if resp.get("raw_text"):
            st.code(resp.get("raw_text")[:1000])
        return []

    jobs = _normalize_job_response(resp)

    if not jobs:
        st.info("No recommended jobs found for given skills.")
        return []

    for job in jobs:
        st.markdown(f"### 🧑‍💻 {job.get('job_title','Unknown')} — *{job.get('role','-')}*")
        st.write(f"**Company:** {job.get('company','-')}")
        st.write(f"**Location:** {job.get('location','-')}")
        exp = job.get("experience_range") or {}
        st.write(f"**Experience:** {exp.get('min','?')} - {exp.get('max','?')} years")
        qual = job.get("qualification_level", "-")
        if isinstance(qual, str):
            qual = qual.title()
        st.write(f"**Qualification:** {qual}")
        salary = job.get("salary_range") or {}
        try:
            smin = salary.get("min")
            smax = salary.get("max")
            st.write(f"**Salary:** ${smin:,} - ${smax:,}") if smin and smax else None
        except Exception:
            pass
        st.write(f"**Posted On:** {job.get('posting_date','-')}")
        st.write(f"**Required Skills:** {', '.join(job.get('required_skills') or [])}")
        st.write(f"**Similarity Score:** `{job.get('similarity_score',0):.3f}`")
        st.write("**Description:**")
        st.write(job.get("description",""))
        st.divider()

    return jobs
