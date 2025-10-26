from sqlalchemy import Column, String, Float, DateTime, Text, Integer
from sqlalchemy.sql import func
from .db import Base

# Store the latest tokens per username
class UserToken(Base):
    __tablename__ = "user_tokens"
    username = Column(String, primary_key=True, index=True)
    access_token = Column(Text, nullable=True)
    refresh_token = Column(Text, nullable=True)
    expires_at = Column(DateTime, nullable=True)  # UTC expiry time

# Persist results for history
class ResultRecord(Base):
    __tablename__ = "result_records"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    image_id = Column(String, index=True, nullable=False)
    timestamp = Column(DateTime, nullable=True)  # from upstream
    intensity_average = Column(Float, nullable=True)
    focus_score = Column(Float, nullable=True)
    classification_label = Column(String, nullable=True)
    histogram_json = Column(Text, nullable=True)  # JSON string of 256 bins
    created_at = Column(DateTime(timezone=True), server_default=func.now())
