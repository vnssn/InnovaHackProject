# AI Financial Copilot — Backend Direction

## Overview

FastAPI-based backend for an AI-powered financial copilot. Handles authentication, transaction aggregation, merchant intelligence, AI-powered analysis, location-based insights, subscription detection, budgeting, and notifications.

## Tech Stack

- **Framework:** FastAPI (Python)
- **ORM:** SQLAlchemy 2.0 (async)
- **Database:** PostgreSQL
- **Migrations:** Alembic
- **Caching:** Redis
- **Auth:** JWT + Refresh Tokens (python-jose, passlib)
- **AI:** OpenAI SDK
- **Validation:** Pydantic v2
- **Deployment:** Docker + Docker Compose

## Base URL

```
http://localhost:8000
```

## API Versioning

All routes are prefixed with `/api/v1`.

## Authentication

### Headers

```
Authorization: Bearer <access_token>
```

### Token Format

- `access_token`: Short-lived (30 minutes)
- `refresh_token`: Long-lived (7 days)

### Error Response (Unauthorized)

```json
{
  "detail": "Not authenticated"
}
```

---

## Route Table

### Auth

| Method | Path | Auth | Description | Request Body | Response |
|---|---|---|---|---|---|
| POST | `/api/v1/auth/register` | No | Register new user | `{ "email": str, "password": str, "name": str, "phone": str? }` | `{ "id": uuid, "email": str, "name": str, "created_at": datetime }` |
| POST | `/api/v1/auth/login` | No | Login | `{ "email": str, "password": str }` | `{ "access_token": str, "refresh_token": str, "user": UserOut }` |
| POST | `/api/v1/auth/refresh` | No | Refresh tokens | `{ "refresh_token": str }` | `{ "access_token": str, "refresh_token": str }` |
| GET | `/api/v1/auth/me` | Yes | Get current user | — | `{ "id": uuid, "email": str, "name": str, "phone": str?, "created_at": datetime }` |
| POST | `/api/v1/auth/logout` | Yes | Logout (invalidate refresh) | `{ "refresh_token": str }` | `{ "message": "Logged out" }` |

### Transactions

| Method | Path | Auth | Description | Query Params / Body | Response |
|---|---|---|---|---|---|
| GET | `/api/v1/transactions` | Yes | List transactions | `page=1&size=20&sort_by=date&sort_order=desc&search=&merchant_id=&category_id=&provider=&city=&status=&start_date=&end_date=&min_amount=&max_amount=` | `{ "items": TransactionOut[], "total": int, "page": int, "size": int, "pages": int }` |
| GET | `/api/v1/transactions/{id}` | Yes | Get transaction detail | — | `TransactionOut` (with merchant, category, location nested) |
| PATCH | `/api/v1/transactions/{id}/category` | Yes | Recategorize transaction | `{ "category_id": uuid }` | `TransactionOut` |
| GET | `/api/v1/transactions/timeline` | Yes | Grouped timeline | `group_by=daily|weekly|monthly|yearly&start_date=&end_date=` | `{ "periods": [{ "period": str, "total": float, "count": int, "transactions": TransactionOut[] }] }` |
| GET | `/api/v1/transactions/replay` | Yes | Financial replay for a day | `date=2024-03-15` | `{ "date": str, "transactions": TransactionOut[], "total": float, "ai_summary": str?, "category_breakdown": {} }` |

### Merchants

| Method | Path | Auth | Description | Query Params | Response |
|---|---|---|---|---|---|
| GET | `/api/v1/merchants` | Yes | List merchants | `page=1&size=20&search=&sort_by=name&sort_order=asc` | `{ "items": MerchantOut[], "total": int, "page": int, "size": int }` |
| GET | `/api/v1/merchants/{id}` | Yes | Get merchant detail | — | `MerchantOut` |
| GET | `/api/v1/merchants/{id}/analytics` | Yes | Merchant analytics | — | `{ "total_spent": float, "avg_order_value": float, "visit_count": int, "first_transaction": datetime, "latest_transaction": datetime, "monthly_trend": [{ "month": str, "total": float }], "most_common_day": str, "avg_monthly_expense": float, "payment_frequency": str, "location": { "lat": float, "lng": float, "city": str, "locality": str } }` |

### Categories

| Method | Path | Auth | Description | Response |
|---|---|---|---|---|
| GET | `/api/v1/categories` | Yes | List categories | `{ "items": [{ "id": uuid, "name": str, "icon": str?, "color": str? }] }` |

### Subscriptions & Recurring Payments

| Method | Path | Auth | Description | Request Body / Params | Response |
|---|---|---|---|---|---|
| GET | `/api/v1/subscriptions` | Yes | List detected subscriptions | `status=active|cancelled&page=1&size=20` | `{ "items": SubscriptionOut[], "total": int }` |
| PATCH | `/api/v1/subscriptions/{id}` | Yes | Update subscription | `{ "status": str?, "notes": str?, "custom_name": str? }` | `SubscriptionOut` |
| DELETE | `/api/v1/subscriptions/{id}` | Yes | Remove subscription | — | `{ "message": "Deleted" }` |
| POST | `/api/v1/subscriptions/detect` | Yes | Trigger AI subscription detection | — | `{ "subscriptions": SubscriptionOut[], "detected_count": int }` |
| GET | `/api/v1/subscriptions/leaks` | Yes | Subscription leak analysis | — | `{ "leak_score": float, "potential_savings": float, "unused": SubscriptionOut[], "duplicates": SubscriptionOut[], "price_increases": SubscriptionOut[], "recommendations": str[] }` |

### Analytics

| Method | Path | Auth | Description | Response |
|---|---|---|---|---|
| GET | `/api/v1/analytics/dashboard` | Yes | Dashboard summary cards | `{ "monthly_spending": float, "today_spending": float, "category_count": int, "top_merchant": MerchantBrief?, "top_category": str, "subscription_count": int, "potential_savings": float, "spending_change_pct": float }` |
| GET | `/api/v1/analytics/category-breakdown` | Yes | Category-wise spending | `{ "items": [{ "category_id": uuid, "category_name": str, "total": float, "percentage": float, "transaction_count": int, "color": str? }] }` |
| GET | `/api/v1/analytics/trends` | Yes | Monthly/trend data | `period=1m|3m|6m|1y&category_id=` | `{ "items": [{ "period": str, "total": float, "categories": {} }] }` |
| GET | `/api/v1/analytics/overview` | Yes | Full analytics overview | — | `{ "dashboard": {}, "category_breakdown": {}, "trends": {}, "top_merchants": [] }` |

### AI

| Method | Path | Auth | Description | Request Body | Response |
|---|---|---|---|---|---|
| POST | `/api/v1/ai/chat` | Yes | Natural language query about finances | `{ "message": str }` | `{ "response": str, "citations": [{ "transaction_id": uuid, "merchant": str, "amount": float, "date": datetime }?] }` |
| GET | `/api/v1/ai/insights` | Yes | Get generated financial insights | — | `{ "insights": [{ "id": uuid, "title": str, "description": str, "type": str, "severity": str, "created_at": datetime }] }` |
| GET | `/api/v1/ai/coach` | Yes | Spending coach suggestions | — | `{ "suggestions": [{ "title": str, "description": str, "potential_savings": float?, "priority": str }] }` |
| POST | `/api/v1/ai/analyze` | Yes | Trigger full AI analysis (categorize, detect subs, generate insights) | — | `{ "status": str, "message": str }` |
| POST | `/api/v1/ai/predict` | Yes | Predict next month spending | — | `{ "predicted_total": float, "confidence": float, "category_breakdown": {} }` |

### Locations

| Method | Path | Auth | Description | Query Params | Response |
|---|---|---|---|---|---|
| GET | `/api/v1/locations/heatmap` | Yes | Monthly spending heatmap | `month=&year=` | `{ "points": [{ "lat": float, "lng": float, "weight": float, "category": str }] }` |
| GET | `/api/v1/locations/clusters` | Yes | Marker cluster data | `zoom_level=1-15&north=&south=&east=&west=` | `{ "clusters": [{ "lat": float, "lng": float, "count": int, "total": float }] }` |
| GET | `/api/v1/locations/top-cities` | Yes | Top spending cities | — | `{ "items": [{ "city": str, "total": float, "count": int, "percentage": float }] }` |
| GET | `/api/v1/locations/top-localities` | Yes | Top spending localities | `city=` | `{ "items": [{ "locality": str, "city": str, "total": float, "count": int }] }` |

### Notifications

| Method | Path | Auth | Description | Query Params / Body | Response |
|---|---|---|---|---|---|
| GET | `/api/v1/notifications` | Yes | List notifications | `page=1&size=20&unread_only=true` | `{ "items": NotificationOut[], "total": int, "unread_count": int }` |
| PATCH | `/api/v1/notifications/{id}/read` | Yes | Mark notification as read | — | `NotificationOut` |
| PATCH | `/api/v1/notifications/read-all` | Yes | Mark all as read | — | `{ "message": "All marked as read" }` |

### Budgets

| Method | Path | Auth | Description | Request Body / Params | Response |
|---|---|---|---|---|---|
| GET | `/api/v1/budgets` | Yes | List budgets | `page=1&size=20` | `{ "items": BudgetOut[], "total": int }` |
| POST | `/api/v1/budgets` | Yes | Create budget | `{ "category_id": uuid, "monthly_limit": float, "month": str? }` | `BudgetOut` |
| PATCH | `/api/v1/budgets/{id}` | Yes | Update budget | `{ "monthly_limit": float?, "category_id": uuid? }` | `BudgetOut` |
| DELETE | `/api/v1/budgets/{id}` | Yes | Delete budget | — | `{ "message": "Deleted" }` |
| GET | `/api/v1/budgets/{id}/progress` | Yes | Budget progress | — | `{ "budget": BudgetOut, "spent": float, "remaining": float, "percentage": float, "projected": float }` |

### Goals

| Method | Path | Auth | Description | Request Body / Params | Response |
|---|---|---|---|---|---|
| GET | `/api/v1/goals` | Yes | List goals | — | `{ "items": GoalOut[] }` |
| POST | `/api/v1/goals` | Yes | Create goal | `{ "name": str, "target_amount": float, "current_amount": float?, "deadline": date? }` | `GoalOut` |
| PATCH | `/api/v1/goals/{id}` | Yes | Update goal | `{ "name": str?, "target_amount": float?, "current_amount": float?, "deadline": date? }` | `GoalOut` |
| DELETE | `/api/v1/goals/{id}` | Yes | Delete goal | — | `{ "message": "Deleted" }` |

### Dummy Payment Gateway (Dev Only)

| Method | Path | Auth | Description | Request Body | Response |
|---|---|---|---|---|---|
| POST | `/api/v1/dummy/payments` | Yes | Simulate a single payment | `{ "merchant": str, "amount": float, "category": str?, "provider": str, "city": str?, "locality": str?, "lat": float?, "lng": float? }` | `TransactionOut` |
| POST | `/api/v1/dummy/subscriptions` | Yes | Simulate a subscription payment | `{ "merchant": str, "amount": float, "frequency": str, "category": str?, "provider": str, "next_date": date? }` | `SubscriptionOut` |
| POST | `/api/v1/dummy/bulk` | Yes | Bulk generate realistic transactions | `{ "count": int?, "months_back": int? }` | `{ "created": int, "message": str }` |
| GET | `/api/v1/dummy/providers` | No | List available dummy providers | — | `{ "providers": [str] }` |

---

## Common Query Parameters

All list endpoints support:

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | int | 1 | Page number |
| `size` | int | 20 | Items per page (max 100) |
| `sort_by` | str | `created_at` | Field to sort by |
| `sort_order` | str | `desc` | `asc` or `desc` |

---

## Response Envelope

List responses follow this structure:

```json
{
  "items": [],
  "total": 100,
  "page": 1,
  "size": 20,
  "pages": 5
}
```

Error responses:

```json
{
  "detail": "Error message here"
}
```

Validation errors (422):

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## Architecture

```
Client (Frontend)
    |
    v
FastAPI (REST API)
    |
    ├── Auth Middleware (JWT)
    |
    ├── Service Layer (business logic)
    |       |
    |       ├── Repository Layer (data access)
    |       |       |
    |       |       └── PostgreSQL (via SQLAlchemy async)
    |       |
    |       ├── AI Service (OpenAI SDK)
    |       |
    |       ├── Payment Adapters (Dummy, future: PhonePe/GPay)
    |       |
    |       └── Notification Service
    |
    └── Redis Cache (analytics, frequent reads)
```

### Key Patterns

1. **Adapter Pattern** — `BasePaymentAdapter` interface. Dummy adapter built-in. Future real payment adapters (PhonePe, GPay, Paytm) plug in via config. Business logic never touches provider-specific code.

2. **Repository Pattern** — Services never call DB directly. Repositories encapsulate all queries. Makes testing easy (mock repositories).

3. **Service Layer** — All business logic lives in services. Controllers (routes) are thin — parse request, call service, return response.

4. **AI Integration** — OpenAI function calling with structured outputs. All AI calls return typed JSON, not raw markdown. Transaction context is injected via system prompt + RAG-style retrieval of recent transactions.

---

## Database Schema (Entity Overview)

- **users** — id, email, hashed_password, name, phone, avatar_url, is_active, created_at, updated_at
- **transactions** — id, user_id (FK), merchant_id (FK), category_id (FK), location_id (FK), provider, amount, description, status, payment_method, reference_number, remarks, transaction_date, created_at
- **merchants** — id, name, category_id (FK), logo_url, lat, lng, city, locality, state, created_at
- **categories** — id, name, icon, color, is_system, created_at
- **locations** — id, lat, lng, city, locality, state, full_address
- **subscriptions** — id, user_id (FK), merchant_id (FK), amount, frequency, next_date, status, category_id (FK), notes, created_at
- **budgets** — id, user_id (FK), category_id (FK), monthly_limit, month, spent, created_at, updated_at
- **goals** — id, user_id (FK), name, target_amount, current_amount, deadline, status, created_at
- **notifications** — id, user_id (FK), title, message, type, is_read, metadata (JSON), created_at
- **ai_conversations** — id, user_id (FK), message, response, citations (JSON), created_at
- **ai_insights** — id, user_id (FK), title, description, type, severity, metadata (JSON), created_at

---

## Setup & Run

```bash
# Clone and enter backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL, OPENAI_API_KEY, JWT_SECRET

# Run migrations
alembic upgrade head

# Seed dummy data
python seed.py

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# With Docker
docker-compose up --build
```

## Docker Compose

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis
    env_file: ./backend/.env

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: finacial_copilot
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

---

## Notes for Frontend

- All dates in ISO 8601 format (`2024-03-15T10:30:00Z`)
- All amounts in INR (float, 2 decimal places)
- UUIDs are v4 format
- Pagination is 1-indexed
- Search is case-insensitive, matches merchant name, description, category
- Timeline endpoint groups transactions by day/week/month/year
- AI chat endpoint is synchronous (not streaming) — sends full response when ready
- Heatmap data uses normalized weights (0-1) for color intensity
- CORS enabled for `http://localhost:3000` (Next.js dev server)
