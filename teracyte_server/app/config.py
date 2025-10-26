import os
from dotenv import load_dotenv

load_dotenv()

# Base URL of the hosted API
UPSTREAM_BASE_URL = os.getenv("UPSTREAM_BASE_URL", "https://assignment-server-rv-866595813231.us-central1.run.app")
# SQLite path
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./data.db")
# CORS origin for your frontend
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",") if o.strip()]
