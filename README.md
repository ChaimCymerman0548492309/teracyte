````markdown
# 🧬 TeraCyte Full-Stack Assignment — Live Image Dashboard

Complete full-stack app (FastAPI + React + TypeScript + Docker)  
for the **TeraCyte microscopy streaming and AI inference dashboard**.

---

## 🚀 Overview

| Folder | Description |
|---------|-------------|
| `teracyte_server/` | FastAPI backend — JWT proxy to TeraCyte API |
| `teracyte_client/` | React + Vite + TypeScript frontend dashboard |
| `docker-compose.yml` | Runs both apps together |
| `ai_artifacts/` | AI-driven analysis artifacts (bonus) |

---

## 📦 Clone Repository

```bash
git clone https://github.com/ChaimCymerman0548492309/teracyte.git
cd teracyte
````

---

## 🏗️ Local Setup (Manual)

### 1️⃣ Backend

```bash
cd teracyte_server
python -m venv venv
venv\Scripts\activate   # Windows
# or source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Access docs → [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 2️⃣ Frontend

```bash
cd ../teracyte_client
npm install
npm run dev
```

Frontend → [http://localhost:5173](http://localhost:5173)

---

## 🐳 Run with Docker Compose

To launch both services together:

```bash
docker compose up --build
```

* Backend → `localhost:8000`
* Frontend → `localhost:5173`

Stop with:

```bash
docker compose down
```

---

## 🔑 Test Credentials

```
username: chaim.cymerman
password: cells406
Base URL: https://assignment-server-rv-866595813231.us-central1.run.app/
```

---

## 🧩 Architecture Diagram

```
[ React Frontend (MUI + Recharts) ]
               │
               ▼
[ FastAPI Backend Proxy (JWT + Refresh) ]
               │
               ▼
[ Hosted TeraCyte API (Microscope Data) ]
               │
               ▼
[ SQLite / IndexedDB Local Storage ]
```

**Flow summary:**
Frontend polls the backend every few seconds.
Backend manages JWT lifecycle and proxies requests to the hosted TeraCyte API.
Results are cached locally in SQLite and stored in IndexedDB for History/Stats.

---

## 📁 Local Database

### 🗄️ SQLite (Backend)

File: `teracyte_server/data.db`

| Table          | Purpose                             |
| -------------- | ----------------------------------- |
| `UserToken`    | Stores access, refresh, expiry      |
| `ResultRecord` | Stores image_id, histogram, metrics |

### 💾 IndexedDB (Frontend)

Database: `TeraCyteDB`

| Table    | Columns                                                                             |
| -------- | ----------------------------------------------------------------------------------- |
| `images` | `image_id`, `focus_score`, `intensity_average`, `classification_label`, `timestamp` |

---

## 🧮 Image-Processing Choice

**Step:** Grayscale conversion
**Implementation:** Canvas-based pixel transformation on client side
**Reasoning:** Classical, deterministic image normalization;
reduces color variance for metric visualization without adding noise.

---

## ✅ Assignment Compliance

| Requirement                            | Implemented |
| -------------------------------------- | ----------- |
| JWT + refresh                          | ✅           |
| Error handling                         | ✅           |
| Polling image/results                  | ✅           |
| Image processing (grayscale)           | ✅           |
| Local persistence (SQLite + IndexedDB) | ✅           |
| Responsive desktop MUI UI              | ✅           |
| Docker setup                           | ✅           |
| AI Dev Tools outputs                   | ✅           |

---

## ⚙️ Tech Stack

**Backend:** FastAPI · SQLAlchemy · SQLite
**Frontend:** React · Vite · TypeScript · MUI · Recharts
**DevOps:** Docker · docker-compose
**AI Artifacts:** Lint · Dependency Graph · Type Check

---

## 🧩 Common Commands

| Task              | Command                                               |
| ----------------- | ----------------------------------------------------- |
| Run backend only  | `cd teracyte_server && uvicorn app.main:app --reload` |
| Run frontend only | `cd teracyte_client && npm run dev`                   |
| Run both (Docker) | `docker compose up --build`                           |
| Stop containers   | `docker compose down`                                 |

---

## 🧱 File Structure

```
teracyte/
├─ teracyte_server/
│  ├─ app/
│  ├─ data.db
│  └─ requirements.txt
├─ teracyte_client/
│  ├─ src/
│  └─ package.json
├─ ai_artifacts/
├─ docker-compose.yml
└─ README.md
```

---

## 🧠 How to Verify

1. Start backend (or docker compose).
2. Open frontend → [localhost:5173](http://localhost:5173).
3. Login using test credentials.
4. Observe live image + histogram updates.
5. Toggle grayscale mode.
6. Inspect `data.db` or IndexedDB for stored results.

---

## 📜 AI-Driven Dev Tools

Folder: `ai_artifacts/`

Contains:

* Dependency graph (`graph.dot` / `graph.json`)
* Lint & TypeScript type check outputs
* Optional screenshots / video recording
* Code search findings

Used for transparency in AI-assisted development.

---

## 🧾 Summary

This repository delivers a complete, working solution for the
**TeraCyte Full-Stack Home Assignment**, including:

* Secure authentication with JWT + refresh
* Real-time polling for microscope images and results
* Classical grayscale image-processing toggle
* Local persistence via SQLite (server) and IndexedDB (client)
* Fully responsive desktop UI built with MUI and Recharts
* Dockerized deployment
* AI-assisted development artifacts

**Author:** Chaim Cymerman
**Submission:** 2025
**License:** MIT

```
```
