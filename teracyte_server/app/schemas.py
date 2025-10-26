from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

# Auth
class LoginRequest(BaseModel):
    username: str
    password: str

class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int

class RefreshRequest(BaseModel):
    refresh_token: Optional[str] = None  # optional, fallback to stored

# Me
class MeResponse(BaseModel):
    username: str

# Image payloads
class ImageResponse(BaseModel):
    image_id: str
    timestamp: Optional[datetime] = None
    image_data_base64: str

# Results payloads
class ResultsResponse(BaseModel):
    image_id: str
    intensity_average: float
    focus_score: float
    classification_label: str
    histogram: List[int]
