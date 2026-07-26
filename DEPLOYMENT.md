# SpendSense / InnovaHack - Full-Stack Deployment Guide

This repository is pre-configured for seamless, production-ready deployment with a **FastAPI backend on Render** and a **Next.js frontend on Vercel**.

---

## 🚀 Part 1: Deploy Backend on Render (FastAPI + PostgreSQL)

We use Render's Blueprint specification (`render.yaml`) to automatically provision a free managed PostgreSQL database and deploy the FastAPI web service with zero manual database configuration.

### Step-by-Step Instructions:
1. **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2. Go to the [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** and select **Blueprint**.
4. Connect your repository and click **Connect**.
5. Render will automatically read the root [`render.yaml`](file:///c:/Users/AYUSH/OneDrive/Desktop/InnovaHackProject/render.yaml) file and configure:
   - **Database**: A free managed PostgreSQL database (`spendsense-db`).
   - **Web Service**: A Python Python 3.11 web service (`spendsense-backend`) rooted in the `/backend` directory.
   - **Connection String**: Automatically links the PostgreSQL DB connection URL into the environment variable `DATABASE_URL`.
6. (Optional) In the Render dashboard under **Environment**, you can input your AI keys:
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
   - `OPENROUTER_API_KEY`
7. Click **Apply Blueprint**.

### ✨ Automatic Database Seeding on Startup
Our [`render.yaml`](file:///c:/Users/AYUSH/OneDrive/Desktop/InnovaHackProject/render.yaml) runs the start command:
```bash
python seed.py && uvicorn app.main:app --host 0.0.0.0 --port $PORT
```
Whenever the server starts or redeploys:
- Database tables are automatically migrated/created.
- A demo user account and 100 sample transactions across categories are automatically seeded if the database is empty.
- **Demo Credentials**: Email `demo@example.com` | Password `demo123`

When deployment finishes, **copy your backend service URL** (e.g., `https://spendsense-backend.onrender.com`).

---

## 🚂 Part 1 (Recommended Alternative): Deploy Backend on Railway (FastAPI + PostgreSQL)

> [!NOTE]
> **Why Render Might Be Failing / Slow:** On Render's Free tier, web services spin down after 15 minutes of inactivity and can take 50+ seconds to wake up (causing timeout errors on your frontend). Railway provides instant cold starts and is highly recommended if you encounter connection timeouts on Render.

We have included pre-configured [`railway.json`](file:///c:/Users/AYUSH/OneDrive/Desktop/InnovaHackProject/railway.json) files so Railway can automatically build and deploy your application.

### Step-by-Step Railway Deployment:
1. Go to the [Railway Dashboard](https://railway.app/) and sign in with GitHub.
2. Click **New Project** → **Deploy from GitHub repo** → select this repository (`InnovaHackProject`).
3. **Add a PostgreSQL Database**:
   - In the project canvas, click **New +** → **Database** → **Add PostgreSQL**.
4. **Link Database to Web Service**:
   - Click on your deployed web service box in the canvas.
   - Go to the **Variables** tab.
   - Click **New Variable** → click **Add Reference** → select `DATABASE_URL` from your PostgreSQL service.
5. **Add API Keys** (Optional, under the **Variables** tab):
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
   - `OPENROUTER_API_KEY`
6. **Generate a Domain**:
   - Go to the **Settings** tab of your web service.
   - Under **Networking / Public Networking**, click **Generate Domain** (you will get a URL like `https://your-project.up.railway.app`).
7. **Done!** When the server boots up, our pre-configured Dockerfile/start command automatically runs `seed.py` to migrate the database and populate demo data!

When deployment finishes, **copy your Railway backend domain** (e.g., `https://your-project.up.railway.app`).

---

## 🌐 Part 2: Deploy Frontend on Vercel (Next.js 16 + React 19)

The frontend is located in the `/frontend` folder and is fully optimized for Vercel deployment with pre-configured headers and build settings.

### Step-by-Step Instructions:
1. Go to the [Vercel Dashboard](https://vercel.com/new).
2. Click **Add New...** -> **Project** and import your Git repository.
3. In **Project Settings**:
   - **Root Directory**: Click **Edit** and select `frontend`. *(Note: Even if you forget to select this, a root `vercel.json` is provided as a fallback).*
   - **Framework Preset**: Vercel will automatically detect **Next.js**.
4. In **Environment Variables**, add the following variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your Render backend URL appended with `/api/v1`
     - Example: `https://spendsense-backend.onrender.com/api/v1`
   - *(Optional)* **Key**: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - *(Optional)* **Value**: Your Google OAuth Client ID if using Google Sign-In.
5. Click **Deploy**.

---

## 🔒 CORS & Security
- **Backend CORS**: The FastAPI CORS middleware in [`main.py`](file:///c:/Users/AYUSH/OneDrive/Desktop/InnovaHackProject/backend/app/main.py) is pre-configured with regex matching to automatically accept requests from any `*.vercel.app`, `*.onrender.com`, `*.railway.app`, or `*.up.railway.app` domain, as well as `localhost:3000` during local development.
- **SSL Mode Compatibility**: The database engine in [`database.py`](file:///c:/Users/AYUSH/OneDrive/Desktop/InnovaHackProject/backend/app/core/database.py) automatically sanitizes cloud PostgreSQL connection parameters (`?sslmode=require` → `?ssl=require`), ensuring complete compatibility with `asyncpg` on cloud providers.
