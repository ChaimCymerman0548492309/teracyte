from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .db import get_db
from .auth_client import UpstreamClient
from .schemas import LoginRequest, TokenPair, RefreshRequest, MeResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Simple convention: username in body drives token storage row
@router.post("/login", response_model=TokenPair)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    client = UpstreamClient(db)
    try:
        data = client.login(payload.username, payload.password)
        return data
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.post("/refresh", response_model=TokenPair)
def refresh(payload: RefreshRequest, db: Session = Depends(get_db)):
    # Caller must have logged-in at least once
    # If refresh_token provided, it overrides stored
    # Username must be determinable; here we expect last login user to refresh by passing username via query in real app.
    # For simplicity use a single-user scenario. Extend as needed.
    # In multi-user, pass ?username=... or Authorization subject.
    username = "default"  # Use a fixed bucket when not separating users
    if not payload.refresh_token:
        # still allow if already logged in and stored
        pass
    client = UpstreamClient(db)
    try:
        data = client.refresh(username, payload.refresh_token)
        return data
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.get("/me", response_model=MeResponse)
def me(db: Session = Depends(get_db)):
    # Single-user bucket
    username = "chaim.cymerman"
    client = UpstreamClient(db)
    try:
        data = client.me(username)
        # Normalize upstream response into MeResponse
        user = data.get("username") or data.get("user") or "unknown"
        return {"username": user}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
