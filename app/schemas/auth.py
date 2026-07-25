from datetime import datetime

from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    phone: str | None = None


class LoginRequest(BaseModel):
    email: str
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: "UserOut"


class UserOut(BaseModel):
    id: str
    email: str
    name: str
    phone: str | None = None
    avatar_url: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}
