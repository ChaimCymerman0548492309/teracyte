````markdown
# 🧪 TeraCyte Frontend — Live Image Dashboard (React + Vite + TS)

This frontend implements a **desktop-only dashboard** for the TeraCyte system.  
It authenticates via the FastAPI backend, polls microscope images and metrics, and visualizes results in real time.

---

## 🚀 Features
- React + TypeScript + Vite  
- JWT login + auto-refresh via backend  
- Real-time polling for `/api/image` and `/api/results`  
- Image processing toggle (Original ↔ Grayscale)  
- 256-bin histogram (Recharts)  
- Material UI design with responsive layout  
- Snackbar alerts for login/logout/error  
- Dockerized with Nginx  

---

## 🏗️ Installation (Local)
```bash
cd teracyte_client
npm install
npm run dev
````

Frontend runs at:
👉 [http://localhost:5173](http://localhost:5173)

### Environment

Create `.env.local`:

```
VITE_API_BASE=http://localhost:8000
```

---

## 🐳 Docker

```bash
docker build -t teracyte_client .
docker run -p 5173:80 teracyte_client
```

---

## 📁 Structure

```
src/
├─ components/
│  ├─ ImagePanel.tsx      # Image display + processed toggle
│  └─ Histogram.tsx        # Recharts histogram
├─ hooks/
│  └─ usePolling.ts        # Reusable polling hook
├─ lib/
│  ├─ api.ts               # Axios client (JWT proxy)
│  └─ image.ts             # Grayscale filter
├─ types.ts                # Typed API models
├─ App.tsx                 # Main logic + MUI UI
├─ App.css                 # Styling + responsiveness
└─ main.tsx
```

---

## 🎨 UI Overview

* **MUI Components:** Button, Snackbar, Alert, TextField
* **Status Bar:** Green (connected), red (error/disconnected)
* **Responsive Design:** Works from desktop to tablet
* **Error Handling:** Snackbar messages on login or connection failure
* **Progress Indicators:** Circular loading spinner during login

---

## 🧠 How It Works

1. User logs in via `/api/auth/login` → backend proxy returns tokens.
2. The dashboard polls `/api/image` and `/api/results` every few seconds.
3. If a new `image_id` is detected → UI updates with new image and histogram.
4. The backend handles token refresh and DB persistence automatically.
5. Frontend only consumes clean, refreshed data.

---

## ✅ Assignment Compliance

| Requirement      | Implementation                                  |
| ---------------- | ----------------------------------------------- |
| Authentication   | Login, logout, JWT refresh handled via backend  |
| Error Handling   | Snackbar messages and red status bar            |
| Functionality    | Polls image + results, detects new `image_id`   |
| Histogram        | Rendered with 256 bins using Recharts           |
| Image Processing | Grayscale toggle using Canvas API               |
| UI/UX            | Material UI, responsive, clean                  |
| Architecture     | TypeScript, modular, Docker-ready               |
| Extras           | MUI alerts, responsive design, progress spinner |

---

## 🧾 Summary

This frontend fulfills all **TeraCyte Full-Stack assignment** requirements:

* Secure auth + token refresh via backend
* Real-time dashboard updates
* Visual clarity and polish with Material UI
* Fully typed, containerized, and production-ready

```
```
