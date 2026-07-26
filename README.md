# InnovaHack / SpendSense AI Financial Copilot

An advanced AI-driven financial copilot and expense analysis platform built with a **Next.js 16 / React 19** frontend and a **FastAPI / PostgreSQL** backend.

---

## 🚀 Quick Deployment

This repository is ready to deploy immediately to **Vercel** (Frontend) and **Render** (Backend).

📖 **[See the Step-by-Step Deployment Guide (DEPLOYMENT.md)](file:///c:/Users/AYUSH/OneDrive/Desktop/InnovaHackProject/DEPLOYMENT.md)** for detailed instructions on connecting your Render blueprint and configuring Vercel environment variables.

---

## 🛠️ Tech Stack

- **Frontend** (`/frontend`): Next.js 16 (App Router), React 19, Tailwind CSS, Recharts, Zustand, Leaflet, Axios.
- **Backend** (`/backend`): Python FastAPI, SQLAlchemy (Async), Alembic, Pydantic, PostgreSQL / SQLite, OpenAI & Gemini APIs.

---

## 💻 Local Development

### 1. Start Backend (Port 8000)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed.py
uvicorn app.main:app --reload --port 8000
```

### 2. Start Frontend (Port 3000)
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
**Demo Login**: Email `demo@example.com` | Password `demo123`
