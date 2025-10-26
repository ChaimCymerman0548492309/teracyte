````markdown
# 🧪 TeraCyte Backend — FastAPI Proxy & JWT Manager

This backend implements a secure **FastAPI proxy** to the hosted TeraCyte API.  
It handles login, token refresh, data persistence, and provides endpoints for the frontend dashboard.

---

## 🚀 Features
- FastAPI backend with modular structure  
- JWT authentication + auto-refresh  
- SQLite local DB persistence  
- History tracking for image/results  
- Graceful 401 handling  
- Fully Dockerized  

---

## 🏗️ Installation (Local)
```bash
cd teracyte_server
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
````

Open Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🐳 Docker

```bash
docker build -t teracyte_server .
docker run -p 8000:8000 teracyte_server
```

---

## 📁 Endpoints

| Route               | Method | Description                   |
| ------------------- | ------ | ----------------------------- |
| `/api/auth/login`   | POST   | Login, obtain JWT tokens      |
| `/api/auth/refresh` | POST   | Refresh expired tokens        |
| `/api/auth/me`      | GET    | Get current user              |
| `/api/image`        | GET    | Fetch latest microscope image |
| `/api/results`      | GET    | Fetch metrics + histogram     |
| `/health`           | GET    | Health check                  |

---

## 🧱 Database Schema (`data.db`)

**UserToken**

| Field         | Type      | Description   |
| ------------- | --------- | ------------- |
| username      | TEXT (PK) | Username      |
| access_token  | TEXT      | Active token  |
| refresh_token | TEXT      | Refresh token |
| expires_at    | DATETIME  | Token expiry  |

**ResultRecord**

| Field                | Type      | Description               |
| -------------------- | --------- | ------------------------- |
| image_id             | TEXT (PK) | Image identifier          |
| timestamp            | TEXT      | Timestamp                 |
| intensity_average    | REAL      | Mean intensity            |
| focus_score          | REAL      | Focus score               |
| classification_label | TEXT      | Model label               |
| histogram_json       | TEXT      | Encoded 256-bin histogram |

---

## ⚙️ Architecture Overview

1. **Frontend → Backend** — Login & polling via FastAPI endpoints.
2. **Backend → TeraCyte API** — Authenticated proxy using JWT.
3. **Local DB** — Stores tokens + image results for history.
4. **Auto-refresh** — Refreshes tokens before expiry.
5. **Error handling** — Catches 401, retries, returns clean responses.

---

## ✅ Assignment Compliance

| Requirement      | Implementation                                 |
| ---------------- | ---------------------------------------------- |
| Authentication   | JWT login + refresh flow, secure local storage |
| Error Handling   | 401 auto-refresh + graceful retry              |
| Functionality    | Polling `/api/image` + `/api/results`          |
| Local DB         | SQLite ORM persistence                         |
| History          | Each new image stored locally                  |
| Image Processing | Supported via frontend toggle                  |
| Architecture     | Typed, modular, containerized                  |
| Deliverables     | DB file, README, Docker support                |

---

## 🔑 Test Credentials

```
username: chaim.cymerman
password: cells406
Base URL: https://assignment-server-rv-866595813231.us-central1.run.app/
```

---

## 🧾 Summary

This backend fully satisfies the TeraCyte Full-Stack assignment:

* Secure authentication layer
* Data persistence with history
* Complete REST proxy for the hosted API
* Ready-to-use container setup

```
```
