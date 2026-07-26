from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.repositories.user_repo import UserRepository
from app.schemas.auth import TokenResponse, UserOut


class AuthService:
    def __init__(self, db: AsyncSession):
        self.user_repo = UserRepository(db)

    async def register(self, email: str, password: str, name: str, phone: str | None = None) -> TokenResponse:
        existing = await self.user_repo.get_by_email(email)
        if existing:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

        user = await self.user_repo.create(
            email=email,
            hashed_password=hash_password(password),
            name=name,
            phone=phone,
        )

        access_token = create_access_token(str(user.id))
        refresh_token = create_refresh_token(str(user.id))

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            user=UserOut(
                id=str(user.id),
                email=user.email,
                name=user.name,
                phone=user.phone,
                avatar_url=user.avatar_url,
                created_at=user.created_at,
            ),
        )

    async def login(self, email: str, password: str) -> TokenResponse:
        user = await self.user_repo.get_by_email(email)
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

        access_token = create_access_token(str(user.id))
        refresh_token = create_refresh_token(str(user.id))

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            user=UserOut(
                id=str(user.id),
                email=user.email,
                name=user.name,
                phone=user.phone,
                avatar_url=user.avatar_url,
                created_at=user.created_at,
            ),
        )

    async def google_login(self, token: str) -> TokenResponse:
        email = None
        name = "Google User"
        avatar_url = None

        if token.startswith("{"):
            # Mock token processing
            import json
            try:
                user_data = json.loads(token)
                email = user_data.get("email")
                name = user_data.get("name") or user_data.get("given_name") or (email.split("@")[0] if email else "Google User")
                avatar_url = user_data.get("picture") or user_data.get("avatar_url")
            except Exception as e:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid mock google token: {e}")
        else:
            # Real token processing via Google UserInfo API
            import httpx
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(
                        "https://www.googleapis.com/oauth2/v3/userinfo",
                        headers={"Authorization": f"Bearer {token}"}
                    )
                    if response.status_code == 200:
                        user_info = response.json()
                        email = user_info.get("email")
                        name = user_info.get("name") or user_info.get("given_name") or (email.split("@")[0] if email else "Google User")
                        avatar_url = user_info.get("picture")
                    else:
                        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid google token (status {response.status_code})")
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Google auth error: {e}")

        if not email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email is required from Google Auth")

        user = await self.user_repo.get_by_email(email)
        if not user:
            user = await self.user_repo.create(
                email=email,
                hashed_password=hash_password("google_oauth_mock_password"),
                name=name or "Google User",
                avatar_url=avatar_url,
            )

        access_token = create_access_token(str(user.id))
        refresh_token = create_refresh_token(str(user.id))

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            user=UserOut(
                id=str(user.id),
                email=user.email,
                name=user.name,
                phone=user.phone,
                avatar_url=user.avatar_url,
                created_at=user.created_at,
            ),
        )

    async def refresh(self, refresh_token: str) -> TokenResponse:
        payload = decode_token(refresh_token)
        if payload is None or payload.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

        user = await self.user_repo.get(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

        new_access = create_access_token(str(user.id))
        new_refresh = create_refresh_token(str(user.id))

        return TokenResponse(
            access_token=new_access,
            refresh_token=new_refresh,
            user=UserOut(
                id=str(user.id),
                email=user.email,
                name=user.name,
                phone=user.phone,
                avatar_url=user.avatar_url,
                created_at=user.created_at,
            ),
        )

    async def get_me(self, user_id: str) -> UserOut:
        user = await self.user_repo.get(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return UserOut(
            id=str(user.id),
            email=user.email,
            name=user.name,
            phone=user.phone,
            avatar_url=user.avatar_url,
            created_at=user.created_at,
        )
