import uuid
from datetime import datetime, timezone

from sqlalchemy import Uuid, DateTime, Float, ForeignKey, String

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Budget(Base):
    __tablename__ = "budgets"

    id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    category_id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True), ForeignKey("categories.id"), nullable=False)
    monthly_limit: Mapped[float] = mapped_column(Float, nullable=False)
    month: Mapped[str] = mapped_column(String(7), nullable=False, index=True)
    spent: Mapped[float] = mapped_column(Float, default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    user = relationship("User", back_populates="budgets", lazy="selectin")
    category = relationship("Category", back_populates="budgets", lazy="selectin")
