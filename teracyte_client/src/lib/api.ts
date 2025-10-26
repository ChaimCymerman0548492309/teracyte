import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8000",
  timeout: 15000,
});

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const cfg = err.config;
    if (err.response?.status === 401 && !cfg.__retried && cfg.url?.startsWith("/api/")) {
      cfg.__retried = true;
      return api(cfg);
    }
    return Promise.reject(err);
  }
);

export default api;
