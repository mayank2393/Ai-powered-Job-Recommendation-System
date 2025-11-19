import streamlit as st
from api_client import run_skill_gap
from typing import List, Dict, Any

def show_skill_gap(candidate_skills, jobs):
    st.subheader("🧩 Skill Gap Analysis")

    # ensure candidate_skills is list
    candidate_skills_list = list(candidate_skills or [])

    # Format jobs for backend skill-gap model
    formatted_jobs = []
    for job in jobs or []:
        formatted_jobs.append({
            "job_id": job.get("job_id"),
            "job_title": job.get("job_title", "Unknown"),
            "skills_required": job.get("required_skills", []) or job.get("skills", []),
            "similarity_score": job.get("similarity_score", job.get("score", 0))
        })

    resp = run_skill_gap(candidate_skills_list, formatted_jobs)

    # If backend returned dict error
    if isinstance(resp, dict) and resp.get("error"):
        st.error("Skill-gap API error: " + str(resp["error"]))
        if resp.get("raw_text"):
            st.code(resp.get("raw_text")[:1000])
        return []

    # some implementations return {"candidate_skills":..., "results":[...]}
    results = resp
    if isinstance(resp, dict) and "results" in resp:
        results = resp["results"]
    if not isinstance(results, list):
        st.error("Unexpected response from skill-gap API.")
        st.json(resp)
        return []

    for item in results:
        st.write(f"### {item.get('job_title', 'Unknown')}")
        st.write("Matched:", ", ".join(item.get("matched_skills", []) or []))
        st.write("Missing:", ", ".join(item.get("missing_skills", []) or []))
        st.write(f"Match %: {item.get('match_percent', 0)}")
        st.divider()

    return results
