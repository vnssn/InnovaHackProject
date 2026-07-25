from datetime import datetime

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str


class Citation(BaseModel):
    transaction_id: str
    merchant: str
    amount: float
    date: datetime


class ChatResponse(BaseModel):
    response: str
    citations: list[Citation] | None = None


class InsightOut(BaseModel):
    id: str
    title: str
    description: str
    type: str
    severity: str
    metadata: dict | None = Field(None, validation_alias="meta_data")
    created_at: datetime

    model_config = {"from_attributes": True, "populate_by_name": True}


class InsightsResponse(BaseModel):
    insights: list[InsightOut]


class CoachSuggestion(BaseModel):
    title: str
    description: str
    potential_savings: float | None = None
    priority: str


class CoachResponse(BaseModel):
    suggestions: list[CoachSuggestion]


class AnalyzeResponse(BaseModel):
    status: str
    message: str


class PredictionResponse(BaseModel):
    predicted_total: float
    confidence: float
    category_breakdown: dict
