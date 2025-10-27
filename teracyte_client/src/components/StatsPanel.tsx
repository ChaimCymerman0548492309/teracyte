import { Paper, Typography, Box } from "@mui/material";
import type { ImageRecord } from "../lib/db";

export default function StatsPanel({ history }: { history: ImageRecord[] }) {
  if (!history?.length)
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Stats</Typography>
        <Typography color="text.secondary">Waiting for data...</Typography>
      </Paper>
    );

  const avgFocus =
    history.reduce((a, b) => a + b.focus_score, 0) / history.length;
  const avgIntensity =
    history.reduce((a, b) => a + b.intensity_average, 0) / history.length;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Stats</Typography>
      <Box>
        <Typography>Avg Focus: {avgFocus.toFixed(2)}</Typography>
        <Typography>Avg Intensity: {avgIntensity.toFixed(2)}</Typography>
        <Typography>Total Images: {history.length}</Typography>
      </Box>
    </Paper>
  );
}
