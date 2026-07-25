import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.base import BaseRepository
from app.schemas.goal import GoalCreate, GoalListResponse, GoalOut, GoalUpdate
from app.models.goal import Goal


router = APIRouter(prefix="/goals", tags=["Goals"])


def goal_to_out(g):
    return GoalOut(
        id=str(g.id),
        name=g.name,
        target_amount=g.target_amount,
        current_amount=g.current_amount,
        deadline=g.deadline,
        status=g.status,
        created_at=g.created_at,
    )


def _repo(db):
    return BaseRepository(Goal, db)


@router.get("", response_model=GoalListResponse)
async def list_goals(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = _repo(db)
    items, _ = await repo.list(page=1, size=50, user_id=user.id)
    return GoalListResponse(items=[goal_to_out(g) for g in items])


@router.post("", response_model=GoalOut)
async def create_goal(
    body: GoalCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = _repo(db)
    g = await repo.create(
        user_id=user.id,
        name=body.name,
        target_amount=body.target_amount,
        current_amount=body.current_amount,
        deadline=body.deadline,
    )
    return goal_to_out(g)


@router.patch("/{id}", response_model=GoalOut)
async def update_goal(
    id: str,
    body: GoalUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = _repo(db)
    g = await repo.get(uuid.UUID(id))
    if not g or g.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Goal not found")

    updated = await repo.update(
        uuid.UUID(id),
        name=body.name,
        target_amount=body.target_amount,
        current_amount=body.current_amount,
        deadline=body.deadline,
    )
    return goal_to_out(updated)


@router.delete("/{id}")
async def delete_goal(
    id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = _repo(db)
    g = await repo.get(uuid.UUID(id))
    if not g or g.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Goal not found")
    await repo.delete(uuid.UUID(id))
    return {"message": "Goal deleted"}
