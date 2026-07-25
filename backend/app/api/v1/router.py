from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.transactions import router as transactions_router
from app.api.v1.merchants import router as merchants_router
from app.api.v1.categories import router as categories_router
from app.api.v1.subscriptions import router as subscriptions_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.ai import router as ai_router
from app.api.v1.locations import router as locations_router
from app.api.v1.notifications import router as notifications_router
from app.api.v1.budgets import router as budgets_router
from app.api.v1.goals import router as goals_router
from app.api.v1.dummy_gateway import router as dummy_gateway_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth_router)
api_router.include_router(transactions_router)
api_router.include_router(merchants_router)
api_router.include_router(categories_router)
api_router.include_router(subscriptions_router)
api_router.include_router(analytics_router)
api_router.include_router(ai_router)
api_router.include_router(locations_router)
api_router.include_router(notifications_router)
api_router.include_router(budgets_router)
api_router.include_router(goals_router)
api_router.include_router(dummy_gateway_router)
