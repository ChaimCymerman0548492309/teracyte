import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default memo(function Histogram({ bins }: { bins: number[] }) {
  const data = bins.map((v, i) => ({ b: i, v }));
  return (
<div style={{ width: "100%", height: 180, minHeight: 180 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <XAxis dataKey="b" tick={false} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="v" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
