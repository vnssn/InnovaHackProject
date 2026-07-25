from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.location_repo import LocationRepository
from app.schemas.location import (
    ClustersResponse,
    HeatmapResponse,
    TopCitiesResponse,
    TopLocalitiesResponse,
)

router = APIRouter(prefix="/locations", tags=["Locations"])


@router.get("/heatmap", response_model=HeatmapResponse)
async def get_heatmap(
    month: str | None = None,
    year: str | None = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = LocationRepository(db)
    points = await repo.get_heatmap(user.id, month, year)
    return HeatmapResponse(points=points)


@router.get("/clusters", response_model=ClustersResponse)
async def get_clusters(
    zoom_level: int = Query(10, ge=1, le=15),
    north: float | None = None,
    south: float | None = None,
    east: float | None = None,
    west: float | None = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return ClustersResponse(clusters=[])


@router.get("/top-cities", response_model=TopCitiesResponse)
async def get_top_cities(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = LocationRepository(db)
    items = await repo.get_top_cities(user.id)
    return TopCitiesResponse(items=items)


@router.get("/top-localities", response_model=TopLocalitiesResponse)
async def get_top_localities(
    city: str | None = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = LocationRepository(db)
    items = await repo.get_top_localities(user.id, city)
    return TopLocalitiesResponse(items=items)
