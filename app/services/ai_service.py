import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.transaction_repo import TransactionRepository


class AIService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.txn_repo = TransactionRepository(db)

    async def chat(self, user_id: uuid.UUID, message: str) -> dict:
        recent_result = await self.txn_repo.list_filtered(user_id, page=1, size=20, sort_by="transaction_date", sort_order="desc")
        recent_txns = recent_result[0]

        context_lines = []
        for t in recent_txns:
            merchant_name = t.merchant.name if t.merchant else "Unknown"
            cat_name = t.category.name if t.category else "Uncategorized"
            context_lines.append(
                f"- {t.transaction_date.strftime('%Y-%m-%d %H:%M')} | {merchant_name} | {cat_name} | ₹{t.amount:.2f} | {t.provider}"
            )
        context = "\n".join(context_lines) if context_lines else "No transactions found."

        prompt = (
            "You are an AI financial assistant. Answer the user's question about their spending.\n\n"
            f"Recent transactions:\n{context}\n\n"
            f"User: {message}\n"
            "Give a concise, helpful response with specific numbers. If relevant, cite transactions."
        )

        response_text = (
            f"Based on your recent transactions, here's my analysis:\n\n"
            f"I can see your spending patterns from the last {len(recent_txns)} transactions. "
            f"To give you a precise answer about '{message}', I'll analyze the data.\n\n"
            f"_This is a stub AI response. Connect OpenAI API key in settings to get real AI-powered answers._"
        )

        return {"response": response_text, "citations": []}

    async def get_insights(self, user_id: uuid.UUID) -> list[dict]:
        return [
            {
                "id": str(uuid.uuid4()),
                "title": "Food spending is your top category",
                "description": "You spent the most on food this month. Consider setting a budget.",
                "type": "spending_pattern",
                "severity": "info",
                "created_at": "2024-01-01T00:00:00Z",
            }
        ]

    async def get_coach_suggestions(self, user_id: uuid.UUID) -> list[dict]:
        return [
            {
                "title": "Reduce food delivery expenses",
                "description": "You're spending above average on food delivery. Cooking at home could save ₹2000/month.",
                "potential_savings": 2000,
                "priority": "medium",
            }
        ]

    async def predict(self, user_id: uuid.UUID) -> dict:
        return {
            "predicted_total": 45000,
            "confidence": 0.75,
            "category_breakdown": {"Food": 12000, "Shopping": 8000, "Bills": 5000},
        }
