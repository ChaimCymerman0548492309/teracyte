import { useEffect, useRef, useState } from "react";
import api from "./lib/api";
import { db } from "./lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import type { ImagePayload, ResultsPayload, TokenPair } from "./types";
import Histogram from "./components/Histogram";
import ImagePanel from "./components/ImagePanel";
import HistoryPanel from "./components/HistoryPanel";
import StatsPanel from "./components/StatsPanel";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState("chaim.cymerman");
  const [password, setPassword] = useState("cells406");
  const [tokens, setTokens] = useState<TokenPair | null>(null);
  const [image, setImage] = useState<ImagePayload | null>(null);
  const [results, setResults] = useState<ResultsPayload | null>(null);
  const [status, setStatus] = useState<"ok" | "error" | "none">("none");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const lastImageId = useRef<string | null>(null);

  const history = useLiveQuery(() =>
    db.images.orderBy("timestamp").reverse().limit(10).toArray()
  );

  async function login() {
    try {
      setLoading(true);
      const { data } = await api.post<TokenPair>("/api/auth/login", {
        username,
        password,
      });
      setTokens(data);
      setMsg("✅ Connected successfully");
      setStatus("ok");
    } catch {
      setMsg("❌ Login failed — please try again");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setTokens(null);
    setImage(null);
    setResults(null);
    setMsg("Disconnected");
    setStatus("error");
  }

  async function fetchImageAndResults() {
    if (!tokens) return;
    try {
      const imgRes = await api.get<ImagePayload>("/api/image");
      if (
        imgRes.data?.image_id &&
        imgRes.data.image_id !== lastImageId.current
      ) {
        lastImageId.current = imgRes.data.image_id;
        setImage(imgRes.data);
        const resRes = await api.get<ResultsPayload>("/api/results");
        setResults(resRes.data);

        // שמירה ל־IndexedDB
        await db.images.put({
          image_id: imgRes.data.image_id,
          intensity_average: resRes.data.intensity_average,
          focus_score: resRes.data.focus_score,
          classification_label: resRes.data.classification_label,
          timestamp: Date.now(),
        });
      }
    } catch (e) {
      console.error("Error fetching image/results:", e);
    }
  }

  useEffect(() => {
    const id = setInterval(fetchImageAndResults, 3000);
    return () => clearInterval(id);
  }, [tokens]);

  return (
    <div className="container">
      <Typography variant="h4" color="primary">
        🧪 TeraCyte Live Dashboard
      </Typography>

      {tokens ? (
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.5,
            my: 1.5,
            backgroundColor: status === "ok" ? "#2e7d32" : "#c62828",
            color: "white",
          }}
        >
          <span>{msg || "Connected"}</span>
          <Button variant="contained" color="error" onClick={logout}>
            LOGOUT
          </Button>
        </Paper>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          className="login-form"
        >
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Login"}
          </Button>
        </form>
      )}

      {tokens && (
        <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 2 }}>
          <Paper sx={{ p: 2 }}>
            <ImagePanel image={image} />
          </Paper>

          <Box sx={{ display: "grid", gap: 2 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Metrics
              </Typography>
              {results ? (
                <div className="metrics">
                  <div>Intensity average: {results.intensity_average}</div>
                  <div>Focus score: {results.focus_score}</div>
                  <div>Classification: {results.classification_label}</div>
                </div>
              ) : (
                <div>Waiting for results...</div>
              )}
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Histogram
              </Typography>
              {results ? (
                <Histogram bins={results.histogram} />
              ) : (
                <div>Waiting...</div>
              )}
            </Paper>

            {history && <HistoryPanel history={history} />}
            {history && <StatsPanel history={history} />}
          </Box>
        </Box>
      )}

      <Snackbar
        open={!!msg}
        autoHideDuration={3000}
        onClose={() => setMsg("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {status === "ok" ? (
          <Alert severity="success" sx={{ width: "100%" }}>
            {msg}
          </Alert>
        ) : status === "error" ? (
          <Alert severity="error" sx={{ width: "100%" }}>
            {msg}
          </Alert>
        ) : undefined}
      </Snackbar>
    </div>
  );
}
