import json
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any

import requests
from sqlalchemy.orm import Session

from .config import UPSTREAM_BASE_URL
from .models import UserToken


class UpstreamClient:
    def __init__(self, db: Session):
        self.db = db
        self.base = UPSTREAM_BASE_URL.rstrip("/")

    def _get_tokens(self, username: str) -> Optional[UserToken]:
        return self.db.get(UserToken, username)

    def _save_tokens(self, username: str, access: str, refresh: str, expires_in: int):
        # Convert expires_in (sec) to absolute UTC time with buffer
        expires_at = datetime.now(timezone.utc) + timedelta(seconds=expires_in - 30)
        row = self._get_tokens(username)
        if not row:
            row = UserToken(username=username)
        row.access_token = access
        row.refresh_token = refresh
        row.expires_at = expires_at
        self.db.merge(row)
        self.db.commit()

    def login(self, username: str, password: str) -> Dict[str, Any]:
        url = f"{self.base}/api/auth/login"
        r = requests.post(url, json={"username": username, "password": password}, timeout=15)
        r.raise_for_status()
        data = r.json()
        self._save_tokens(username, data["access_token"], data["refresh_token"], int(data.get("expires_in", 3600)))
        return data

    def refresh(self, username: str, override_refresh: Optional[str] = None) -> Dict[str, Any]:
        url = f"{self.base}/api/auth/refresh"
        refresh_token = override_refresh
        row = self._get_tokens(username)
        if not refresh_token:
            if not row or not row.refresh_token:
                raise ValueError("No refresh token")
            refresh_token = row.refresh_token
        r = requests.post(url, json={"refresh_token": refresh_token}, timeout=15)
        r.raise_for_status()
        data = r.json()
        self._save_tokens(username, data["access_token"], data["refresh_token"], int(data.get("expires_in", 3600)))
        return data

    def _valid_access(self, username: str) -> Optional[str]:
        row = self._get_tokens(username)
        if not row or not row.access_token or not row.expires_at:
            return None
        now = datetime.now(timezone.utc)
        exp = row.expires_at
        if exp.tzinfo is None:
            exp = exp.replace(tzinfo=timezone.utc)
        if now >= exp:
            return None
        return row.access_token

    def _auth_header(self, token: str) -> Dict[str, str]:
        return {"Authorization": f"Bearer {token}"}

    def _authed_get(self, username: str, path: str, retry_on_401: bool = True) -> Dict[str, Any]:
        token = self._valid_access(username)
        if not token:
            self.refresh(username)
            token = self._valid_access(username)
            if not token:
                raise ValueError("Unable to obtain access token")
        url = f"{self.base}{path}"
        r = requests.get(url, headers=self._auth_header(token), timeout=20)
        if r.status_code == 401 and retry_on_401:
            self.refresh(username)
            token = self._valid_access(username)
            if not token:
                raise ValueError("Unable to obtain access token after refresh")
            r = requests.get(url, headers=self._auth_header(token), timeout=20)
        r.raise_for_status()
        return r.json()

    def me(self, username: str) -> Dict[str, Any]:
        return self._authed_get(username, "/api/auth/me")

    def get_image(self, username: str) -> Dict[str, Any]:
        return self._authed_get(username, "/api/image")

    def get_results(self, username: str) -> Dict[str, Any]:
        return self._authed_get(username, "/api/results")

    @staticmethod
    def results_to_hist_json(results: Dict[str, Any]) -> str:
        return json.dumps(results.get("histogram", []), separators=(",", ":"))
