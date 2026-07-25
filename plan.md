# AI Financial Copilot

## Vision

Build an AI-powered financial copilot that enables users to understand, analyze, optimize, and improve their spending habits across all digital payment platforms.

The goal is **NOT** to build another expense tracker.

The goal is to build an intelligent financial assistant that understands every transaction, learns spending habits, detects recurring payments, identifies unnecessary expenses, predicts future spending, and provides actionable recommendations to improve financial health.

This project should be architected as if it were intended to become a production-grade fintech product after the hackathon.

The implementation should emphasize modularity, scalability, clean architecture, maintainability, and extensibility.

---

# Problem Statement

Modern users perform transactions using multiple payment platforms including:

- PhonePe
- Google Pay
- Paytm
- BHIM
- Amazon Pay
- Bank Applications
- Credit Cards
- Debit Cards

Every platform stores its own payment history.

There is no single intelligent platform capable of answering questions like:

- Where did all my money go?
- Why am I spending more this month?
- Which subscriptions are wasting my money?
- Which merchant receives most of my salary?
- What locality do I spend the most money in?
- Which recurring payments should I review?
- How have my spending habits changed?

Users are forced to manually browse hundreds of transactions.

The objective is to automatically organize, enrich, analyze and explain every transaction.

---

# Current Limitation

Official APIs from PhonePe, Paytm, Google Pay and banking applications are unavailable.

Therefore the system must initially work using a Dummy Payment Gateway.

The architecture must be designed using adapters so replacing dummy APIs with real payment APIs later requires almost zero business logic changes.

Never tightly couple payment providers with the application.

---

# High Level Architecture

The project should contain independent modules.

- Frontend
- Backend API
- Authentication Service
- Payment Aggregation Service
- Dummy Payment Gateway
- AI Service
- Notification Service
- Maps Service
- Database
- Future Payment Connectors

Each module should be independently replaceable.

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- ShadCN
- React Query
- Zustand

## Backend

- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- Alembic

## Caching

- Redis

## Authentication

- JWT
- Refresh Tokens

## AI

- OpenAI
- Gemini
- LangChain (optional)

## Deployment

- Docker
- Docker Compose

## Maps

- Google Maps API

---

# Dummy Payment Gateway

Since official APIs are unavailable, create a payment simulation service.

The simulator should expose APIs like:

- POST /payments
- POST /subscriptions
- GET /payments
- GET /subscriptions
- PATCH /payments/:id
- DELETE /subscriptions/:id

Every simulated transaction should immediately appear inside the application.

Support multiple payment providers.

Example providers:

- PhonePe
- Google Pay
- Paytm
- Bank
- Credit Card
- Debit Card
- Wallet

Every payment should include:

- Transaction ID
- Merchant
- Merchant Category
- Provider
- Timestamp
- Amount
- Latitude
- Longitude
- City
- Locality
- State
- Payment Status
- Payment Method
- Reference Number
- Remarks

---

# Unified Transaction Dashboard

Display all transactions regardless of payment provider.

Provide:

- Global Search
- Sorting
- Pagination
- Filters

Filter by:

- Date
- Amount
- Merchant
- Category
- Provider
- City
- Locality
- Status

---

# Smart Categorization

Automatically categorize every payment.

Possible categories:

- Food
- Cafe
- Restaurant
- Travel
- Fuel
- Shopping
- Lifestyle
- Entertainment
- Groceries
- Healthcare
- Education
- Rent
- Bills
- Subscriptions
- Investments
- Salary
- Transfers
- Others

If confidence is low:

- Display a dropdown allowing users to manually classify it.

Future predictions should learn from previous user corrections.

---

# Merchant Intelligence

Clicking a merchant opens a detailed analytics page.

Display:

- Total money spent
- Average order value
- Number of visits
- First transaction
- Latest transaction
- Monthly trend
- Most common spending day
- Average monthly expense
- Location
- Payment frequency

---

# Location Intelligence

Every transaction stores:

- Latitude
- Longitude
- Google Maps coordinates
- City
- Locality
- State

Display:

- Interactive Map
- Marker clusters
- Monthly spending heatmap
- Most visited locations
- Top spending cities
- Top spending localities
- Distance travelled between purchases (future)

---

# Financial Replay

One of the flagship features.

Instead of displaying raw transactions, reconstruct an entire day.

Example:

**Saturday**

- 10:15 AM — Metro — ₹50
- 11:40 AM — McDonald's — ₹350
- 2:00 PM — PVR — ₹650
- 6:00 PM — Uber — ₹290

**Total:** ₹1340

AI Summary:

- Most spending occurred around Connaught Place.
- Today's spending was mostly entertainment.

---

# Spending Timeline

Provide chronological visualization.

Views:

- Daily
- Weekly
- Monthly
- Yearly

Allow filtering by:

- Merchant
- Provider
- Location
- Category

---

# Recurring Payment Detection

Automatically detect recurring transactions.

Examples:

- Netflix
- Spotify
- Broadband
- Mobile Recharge
- Gym
- Electricity
- Cloud Storage
- Insurance
- UPI AutoPay

Display:

- Frequency
- Renewal Date
- Previous Payment
- Next Payment
- Price Increase
- Usage Score
- Recommendation

---

# Subscription Leak Detector

Generate:

- Leak Score
- Potential Savings
- Unused subscriptions
- Duplicate subscriptions
- Silent price increases
- Rarely used memberships

Generate recommendations.

Examples:

- Downgrade broadband
- Cancel duplicate OTT
- Switch cheaper mobile plan

---

# AI Financial Assistant

Users should interact naturally.

Example prompts:

- Where did my salary go?
- What category costs me the most?
- Compare this month with last month.
- Show food expenses.
- Why did spending increase?
- Which subscriptions should I cancel?
- Where do I spend the most money?
- Which merchant receives the most payments?
- Explain today's expenses.

The assistant should use transaction history as context.

Never hallucinate.

Support citations to actual transactions.

---

# AI Spending Coach

Analyze spending behavior.

Generate personalized suggestions.

Examples:

- Food spending increased 24%.
- Restaurant visits increased.
- Average bill size increased.
- Weekend spending is unusually high.
- Most purchases happen after 9 PM.

Generate:

- Potential yearly savings
- Estimated monthly savings
- Budget suggestions
- Financial goals

---

# Notifications

Support:

- Upcoming subscriptions
- Upcoming bills
- Budget exceeded
- Large transactions
- Unusual transactions
- Monthly reports
- Weekly reports
- Price increase alerts
- Recurring payment reminders

---

# Analytics Dashboard

Dashboard Cards:

- Monthly Spending
- Today's Spending
- Category Breakdown
- Top Merchant
- Top Category
- Subscriptions
- Potential Savings

Charts:

- Pie Charts
- Bar Charts
- Monthly Trends
- Heatmaps
- Calendar
- Category Trends
- Merchant Trends

---

# AI Features

- Merchant Classification
- Transaction Summarization
- Behavior Analysis
- Financial Forecasting
- Spending Prediction
- Budget Recommendation
- Subscription Detection
- Natural Language Querying
- Anomaly Detection

---

# Authentication

- JWT Authentication
- Refresh Tokens
- Protected Routes
- Role Based Access (future)

---

# Database Design

Design a normalized PostgreSQL schema.

Tables should include:

- Users
- Transactions
- Merchants
- Merchant Categories
- Subscriptions
- Recurring Payments
- Locations
- Payment Providers
- Notifications
- Budgets
- Goals
- AI Conversations
- AI Insights
- Audit Logs
- Future Integrations

Relationships should be normalized.

---

# API Design

Design clean REST APIs.

Follow best practices.

Support:

- Pagination
- Filtering
- Sorting
- Searching
- Validation
- Versioning
- OpenAPI documentation

---

# Folder Structure

Generate an enterprise-level folder structure for both frontend and backend.

Separate:

- Services
- Repositories
- Controllers
- Schemas
- Routes
- Middlewares
- Utilities
- Config
- Models
- AI
- Notifications
- Payments
- Analytics

---

# UI Design

Design a modern fintech dashboard.

Focus on:

- Minimalism
- Glassmorphism
- Dark Mode
- Responsive Layouts
- Analytics-first Design
- Excellent UX

Provide reusable component architecture.

---

# Engineering Principles

Follow:

- Clean Architecture
- SOLID Principles
- Dependency Injection
- Repository Pattern
- Service Layer
- Adapter Pattern
- Factory Pattern
- Singleton where appropriate
- Reusable Components
- Strict Type Safety
- Modular Design
- Scalable APIs

---

# Future Integrations

Design interfaces for future support of:

- PhonePe APIs
- Google Pay APIs
- Paytm APIs
- UPI AutoPay
- Bank APIs
- SMS Parsing
- Email Parsing
- Account Aggregator APIs

without requiring changes to business logic.

---

# Hackathon Constraints

## Time Available

24 Hours

## Priority

Deliver a polished MVP.

Focus on functionality over perfection.

Avoid unnecessary complexity.

---

# Deliverables

Act as a senior staff engineer and technical architect.

Think deeply before implementing anything.

Challenge assumptions.

Suggest better architecture if necessary.

Always explain tradeoffs.

Generate:

- Complete System Architecture
- High Level Design (HLD)
- Low Level Design (LLD)
- ER Diagram
- Database Schema
- API Specification
- Folder Structure
- Authentication Flow
- Sequence Diagrams
- Notification Flow
- AI Workflow
- State Management
- UI Component Tree
- Deployment Diagram
- Docker Setup
- Development Roadmap
- Hackathon MVP Plan
- Future Production Roadmap

Do not rush into coding.

First think through the architecture thoroughly.

Every design decision should be justified.

Always optimize for maintainability, scalability and developer experience.

Think like a senior engineer designing a fintech product that could eventually serve millions of users.