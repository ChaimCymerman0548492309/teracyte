import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";
import type { ImageRecord } from "../lib/db";

export default function HistoryPanel({ history }: { history: ImageRecord[] }) {
  if (!history?.length)
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>History</Typography>
        <Typography color="text.secondary">No history yet</Typography>
      </Paper>
    );

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>History</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Image ID</TableCell>
            <TableCell>Label</TableCell>
            <TableCell align="right">Focus</TableCell>
            <TableCell align="right">Intensity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((h) => (
            <TableRow key={h.image_id}>
              <TableCell>{h.image_id}</TableCell>
              <TableCell>{h.classification_label}</TableCell>
              <TableCell align="right">{h.focus_score.toFixed(2)}</TableCell>
              <TableCell align="right">{h.intensity_average.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
