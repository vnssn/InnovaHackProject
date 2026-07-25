from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/finacial_copilot"
    SECRET_KEY: str = "change-this-to-a-long-random-string-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    OPENAI_API_KEY: str = ""
    REDIS_URL: str = "redis://localhost:6379/0"
    CORS_ORIGINS: str = "http://localhost:3000"
    APP_NAME: str = "AI Financial Copilot"
    DEBUG: bool = True

    model_config = {
        "env_file": str(Path(__file__).resolve().parents[2] / ".env"),
        "env_file_encoding": "utf-8",
    }


settings = Settings()

if settings.DATABASE_URL.startswith("sqlite+aiosqlite:///./"):
    sqlite_relative_path = settings.DATABASE_URL.removeprefix("sqlite+aiosqlite:///./")
    sqlite_path = (Path(__file__).resolve().parents[2] / sqlite_relative_path).resolve()
    settings.DATABASE_URL = f"sqlite+aiosqlite:///{sqlite_path.as_posix()}"
