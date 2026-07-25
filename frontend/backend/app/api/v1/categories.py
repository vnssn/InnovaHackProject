from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.category_repo import CategoryRepository
from app.schemas.category import CategoryListResponse, CategoryOut

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("", response_model=CategoryListResponse)
async def list_categories(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = CategoryRepository(db)
    items, _ = await repo.list(page=1, size=100)
    return CategoryListResponse(
        items=[
            CategoryOut(id=str(c.id), name=c.name, icon=c.icon, color=c.color)
            for c in items
        ]
    )
