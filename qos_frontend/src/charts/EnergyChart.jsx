import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EnergyChart = ({ result }) => {
  if (!result) {
    return <p style={{ color: "#fff" }}>No result data available</p>;
  }

  const data = [
    {
      name: "Fog Nodes",
      value: result.fog_energy,
    },
    {
      name: "Cloud Nodes",
      value: result.cloud_energy,
    },
  ];

  const COLORS = ["#6ceeff", "#ff6cdd"]; // Fog, Cloud

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          labelStyle={{ fill: "#FFFFFF", fontSize: 13 }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            color: "#fff",
          }}
          itemStyle={{ color: "#fff" }}
        />

        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ color: "#FFFFFF" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EnergyChart;
