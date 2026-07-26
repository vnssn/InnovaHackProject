from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.database import engine, Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        try:
            from seed import seed
            await seed()
        except Exception as seed_err:
            print(f"Skipping auto-seed: {seed_err}")
    except Exception as e:
        print(f"Database not available: {e}")
        print("Run `docker compose up -d` to start PostgreSQL, then run `alembic upgrade head`")
    yield
    await engine.dispose()


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    docs_url="/docs",
    lifespan=lifespan,
)

origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if "*" not in origins else ["http://localhost:3000"],
    allow_origin_regex=r"https://.*\.vercel\.app|https://.*\.onrender\.com|https://.*\.railway\.app|https://.*\.up\.railway\.app|http://localhost:.*|http://127.0.0.1:.*|.*" if "*" in origins else r"https://.*\.vercel\.app|https://.*\.onrender\.com|https://.*\.railway\.app|https://.*\.up\.railway\.app|http://localhost:.*|http://127.0.0.1:.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/health")
async def health():
    return {"status": "healthy", "app": settings.APP_NAME}


@app.get("/health/db")
async def health_db():
    try:
        from sqlalchemy import select
        async with engine.connect() as conn:
            await conn.execute(select(1))
        return {"status": "healthy", "database": "connected", "url_type": str(engine.url).split(":")[0]}
    except Exception as e:
        return {"status": "error", "database": "disconnected", "detail": str(e)}
