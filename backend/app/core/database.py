import os
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

db_url = os.getenv("DATABASE_URL") or os.getenv("DATABASE_PUBLIC_URL") or os.getenv("DATABASE_PRIVATE_URL") or os.getenv("PGURL") or settings.DATABASE_URL

if db_url == "postgresql+asyncpg://postgres:postgres@localhost:5432/finacial_copilot" and os.getenv("PGHOST"):
    pghost = os.getenv("PGHOST")
    pgport = os.getenv("PGPORT", "5432")
    pguser = os.getenv("PGUSER", "postgres")
    pgpassword = os.getenv("PGPASSWORD", "")
    pgdb = os.getenv("PGDATABASE", "postgres")
    db_url = f"postgresql+asyncpg://{pguser}:{pgpassword}@{pghost}:{pgport}/{pgdb}"

if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql+asyncpg://", 1)
elif db_url.startswith("postgresql://") and "+asyncpg" not in db_url:
    db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)
elif db_url.startswith("sqlite://") and "+aiosqlite" not in db_url:
    db_url = db_url.replace("sqlite://", "sqlite+aiosqlite://", 1)

if "sslmode=" in db_url:
    db_url = db_url.replace("sslmode=", "ssl=")

engine = create_async_engine(db_url, echo=settings.DEBUG)

async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
