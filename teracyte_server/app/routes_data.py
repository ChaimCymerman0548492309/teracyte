import json
from datetime import datetime
from typing import Dict, Any, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .db import get_db
from .auth_client import UpstreamClient
from .schemas import ImageResponse, ResultsResponse
from .models import ResultRecord

router = APIRouter(prefix="/api", tags=["data"])

def _store_results(db: Session, results: Dict[str, Any], timestamp: Optional[datetime]):
    # Persist a row for history
    rec = ResultRecord(
        image_id=results["image_id"],
        timestamp=timestamp,
        intensity_average=results.get("intensity_average"),
        focus_score=results.get("focus_score"),
        classification_label=results.get("classification_label"),
        histogram_json=json.dumps(results.get("histogram", []), separators=(",", ":")),
    )
    db.add(rec)
    db.commit()

@router.get("/image", response_model=ImageResponse)
def get_image(db: Session = Depends(get_db)):
    username = "chaim.cymerman"

    client = UpstreamClient(db)
    try:
        data = client.get_image(username)
        # Expect timestamp string; let Pydantic parse
        return data
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

@router.get("/results", response_model=ResultsResponse)
def get_results(db: Session = Depends(get_db)):
    username = "chaim.cymerman"

    client = UpstreamClient(db)
    try:
        data = client.get_results(username)
        # Try to fetch last image timestamp for pairing; optional best-effort
        ts: Optional[datetime] = None
        try:
            img = client.get_image(username)
            # Pydantic handles parsing on response; here keep raw ISO string
            ts = datetime.fromisoformat(img.get("timestamp").replace("Z", "+00:00")) if img.get("timestamp") else None
        except Exception:
            ts = None
        _store_results(db, data, ts)
        return data
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
