import { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { Typography, Box } from "@mui/material";

export default memo(function Histogram({ bins }: { bins: number[] }) {
  const data = bins.map((v, i) => ({ b: i, v }));

  return (
    <Box sx={{ width: "100%", height: 200 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Pixel intensity distribution (0–255)
      </Typography>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <XAxis dataKey="b" tick={false}>
            <Label value="Intensity" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis allowDecimals={false}>
            <Label value="Count" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Bar dataKey="v" fill="#555" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
});
