

### 🧾 **README.md**

````markdown
# 🧬 TeraCyte Full-Stack Assignment — Live Image Dashboard

A complete full-stack solution (FastAPI + React + Vite + TypeScript)  
for the **TeraCyte microscopy streaming and AI inference dashboard** assignment.

---

## 🚀 Overview
This repository contains:

| Folder | Description |
|---------|--------------|
| `teracyte_server/` | FastAPI backend proxy to TeraCyte hosted API |
| `teracyte_client/` | React + Vite + TypeScript frontend dashboard |
| `docker-compose.yml` | Optional file to run both containers together |

Both apps are fully Dockerized and can be run independently or together.

---

## 🏗️ Setup (Manual)
### Backend
```bash
cd teracyte_server
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
````

Backend → [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend

```bash
cd teracyte_client
npm install
npm run dev
```

Frontend → [http://localhost:5173](http://localhost:5173)

---

## 🐳 Setup (Docker Compose)

```bash
docker compose up --build
```

* Frontend runs on port **5173**
* Backend runs on port **8000**

---

## 📁 Local Database Schema

**`data.db` (SQLite)** stores:

* `UserToken`: access/refresh tokens, expiry
* `ResultRecord`: image metrics, histogram, timestamps

This powers the *History* and *Persistence* parts of the assignment.

---

## ✅ Assignment Compliance Summary

| Category             | Implementation                         |
| -------------------- | -------------------------------------- |
| **Authentication**   | JWT login, refresh, secure DB storage  |
| **Error Handling**   | 401 handling, automatic retry          |
| **Functionality**    | Polling `/api/image` & `/api/results`  |
| **Image Processing** | Grayscale toggle                       |
| **Local DB**         | SQLite persistence (data.db committed) |
| **History UX**       | Saved images & results by image_id     |
| **UI/UX**            | MUI-based responsive desktop layout    |
| **Architecture**     | Typed models, modular structure        |
| **Deliverables**     | Code + README + DB + Docker            |

---

## 🔑 Test Credentials

```
username: chaim.cymerman
password: cells406
Base URL: https://assignment-server-rv-866595813231.us-central1.run.app/
```

---

## ⚙️ Stack Summary

* **Backend:** FastAPI, SQLAlchemy, SQLite
* **Frontend:** React, Vite, TypeScript, MUI, Recharts
* **Auth:** JWT + refresh lifecycle
* **Deployment:** Docker, docker-compose
* **Persistence:** Local DB (included)

---

## 🧩 Commands

**Run Backend:**

```bash
cd teracyte_server && uvicorn app.main:app --reload
```

**Run Frontend:**

```bash
cd teracyte_client && npm run dev
```

**Run All (Docker):**

```bash
docker compose up
```

---

## 🧾 Summary

This repo provides a full working implementation of the
**TeraCyte Full-Stack Home Assignment** — including backend proxy, frontend UI,
local persistence, and complete documentation ready for submission.

```

---

```
