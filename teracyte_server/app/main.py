from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import Base, engine
from .config import CORS_ORIGINS
from .routes_auth import router as auth_router
from .routes_data import router as data_router
from .models import UserToken, ResultRecord

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TeraCyte Proxy Server", version="1.0.0")

# CORS for desktop frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(data_router)

@app.get("/health")
def health():
    return {"status": "ok"}
