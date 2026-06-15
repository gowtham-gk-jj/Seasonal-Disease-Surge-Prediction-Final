# 🚀 How to Run the Project

## Step 1 — Clone Repository

```bash
git clone <your-github-repository-url>
cd PS08_Disease_Surge_Project
```

---

## Step 2 — Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## Step 3 — Run Machine Learning Pipeline

Generate engineered features:

```bash
python ml/feature_engineering.py
```

Train baseline and enriched models:

```bash
python ml/train_models.py
```

Generate district risk rankings:

```bash
python ml/district_risk_ranking.py
```

---

## Step 4 — Start Backend Server

```bash
cd backend

npm install

node server.js
```

Backend API:

```text
http://localhost:5000
```

---

## Step 5 — Start Frontend Dashboard

```bash
cd frontend

npm install

npm start
```

Frontend Application:

```text
http://localhost:3000
```

---

## Available API Endpoints

```http
GET /api/predictions
GET /api/predictions/alerts
GET /api/predictions/district/:name
GET /api/predictions/model-performance
GET /api/dashboard/summary
GET /api/districts
```

---

## Project Execution Order

```text
1. Install Python Dependencies
2. Run feature_engineering.py
3. Run train_models.py
4. Run district_risk_ranking.py
5. Start MongoDB Connection
6. Start Backend (server.js)
7. Start Frontend (React)
8. Open http://localhost:3000
```
