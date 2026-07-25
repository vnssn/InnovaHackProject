import asyncio
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Load the keys we just wrote
load_dotenv(".env")

from app.services.ai_service import AIService
from app.core.database import Base

async def test():
    # Use in-memory SQLite just for test setup if possible, or connect to test.db
    engine = create_async_engine("sqlite+aiosqlite:///./test.db", echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        ai_service = AIService(session)
        print("Using model:", ai_service.model)
        
        # Test 1: get_insights (JSON mode)
        print("\n--- Testing get_insights ---")
        # Need a random uuid for user_id to simulate
        import uuid
        user_id = uuid.uuid4()
        
        # We will catch errors here if any
        try:
            insights = await ai_service.get_insights(user_id)
            print("Insights Output:", insights)
        except Exception as e:
            print("Error in insights:", e)
            
        print("\n--- Testing chat ---")
        try:
            chat_resp = await ai_service.chat(user_id, "How much did I spend?")
            print("Chat Output:", chat_resp)
        except Exception as e:
            print("Error in chat:", e)

if __name__ == "__main__":
    asyncio.run(test())
