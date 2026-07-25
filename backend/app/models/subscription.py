import uuid
from datetime import datetime, timezone

from sqlalchemy import Uuid, Date, DateTime, Float, ForeignKey, String, Text

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Subscription(Base):
    __tablename__ = "subscriptions"

    id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    merchant_id: Mapped[uuid.UUID | None] = mapped_column(Uuid(as_uuid=True), ForeignKey("merchants.id"), nullable=True)
    category_id: Mapped[uuid.UUID | None] = mapped_column(Uuid(as_uuid=True), ForeignKey("categories.id"), nullable=True)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    frequency: Mapped[str] = mapped_column(String(20), nullable=False)
    next_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="active", index=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="subscriptions", lazy="selectin")
    merchant = relationship("Merchant", back_populates="subscriptions", lazy="selectin")
    category = relationship("Category", back_populates="subscriptions", lazy="selectin")
