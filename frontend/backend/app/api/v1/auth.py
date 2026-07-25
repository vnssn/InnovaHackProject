from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.auth import (
    LoginRequest,
    GoogleLoginRequest,
    RefreshRequest,
    RegisterRequest,
    TokenResponse,
    UserOut,
)
from app.schemas.common import MessageResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=TokenResponse)
async def register(body: RegisterRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    return await service.register(body.email, body.password, body.name, body.phone)


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    return await service.login(body.email, body.password)


@router.post("/google", response_model=TokenResponse)
async def google_login(body: GoogleLoginRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    return await service.google_login(body.token)


@router.post("/refresh", response_model=TokenResponse)
async def refresh(body: RefreshRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    return await service.refresh(body.refresh_token)


@router.get("/me", response_model=UserOut)
async def get_me(user: User = Depends(get_current_user)):
    return UserOut(
        id=str(user.id),
        email=user.email,
        name=user.name,
        phone=user.phone,
        avatar_url=user.avatar_url,
        created_at=user.created_at,
    )


@router.post("/logout", response_model=MessageResponse)
async def logout(user: User = Depends(get_current_user)):
    return MessageResponse(message="Logged out successfully")
