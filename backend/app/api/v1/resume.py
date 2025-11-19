# backend/app/api/v1/resume.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict
from pydantic import BaseModel

from app.services.resume_parser import parse_resume_from_pdf_bytes, parse_text_resume

router = APIRouter(prefix="/resume", tags=["Resume"])

@router.post("/parse")
async def parse_resume(file: UploadFile = File(...)):
    try:
        data = await file.read()
        parsed = parse_resume_from_pdf_bytes(data)
        # compatibility wrapper: old frontend expects {"profile": { "skills": [...] }}
        # if it already has "profile", keep it
        if "profile" not in parsed:
            parsed = {"profile": parsed}
        return parsed
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))