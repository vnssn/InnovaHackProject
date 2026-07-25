from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.ai import (
    AnalyzeResponse,
    ChatRequest,
    ChatResponse,
    CoachResponse,
    InsightsResponse,
    PredictionResponse,
)
from app.services.ai_service import AIService

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/chat", response_model=ChatResponse)
async def chat(
    body: ChatRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    service = AIService(db)
    result = await service.chat(user.id, body.message)
    return ChatResponse(response=result["response"], citations=result.get("citations"))


@router.get("/insights", response_model=InsightsResponse)
async def get_insights(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    service = AIService(db)
    insights = await service.get_insights(user.id)
    return InsightsResponse(insights=insights)


@router.get("/coach", response_model=CoachResponse)
async def get_coach(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    service = AIService(db)
    suggestions = await service.get_coach_suggestions(user.id)
    return CoachResponse(suggestions=suggestions)


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return AnalyzeResponse(status="queued", message="Analysis will run in the background")


@router.post("/predict", response_model=PredictionResponse)
async def predict(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    service = AIService(db)
    return await service.predict(user.id)
