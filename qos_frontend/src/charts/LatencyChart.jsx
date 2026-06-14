import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  ReferenceLine,
} from "recharts";

// Latency multipliers per algorithm (same as backend)
const ALGO_MULTIPLIERS = {
  "FCFS": 1.0,
  "Round Robin": 0.80,
  "QoS Aware Heuristic": 0.57,
  "Bin Packing": 0.52,
  "Reinforcement Learning": 0.43,
};

const ALGO_COLORS = {
  "FCFS": "#7B8CFF",
  "Round Robin": "#B0B8C5",
  "QoS Aware Heuristic": "#afc522",
  "Bin Packing": "#F59E0B",
  "Reinforcement Learning": "#16A34A",
};

const LatencyChart = ({ result }) => {
  // Base latency driven by user's inputs
  const baseTasks = result?.iot_tasks ?? 100;
  const baseNodes = result?.fog_nodes ?? 10;
  const baseLatency = (baseTasks / baseNodes) * 30;
  const selectedAlgo = result?.algorithm ?? "QoS Aware Heuristic";

  const data = Object.entries(ALGO_MULTIPLIERS).map(([name, mult]) => ({
    name,
    latency: Math.round(baseLatency * mult),
    isSelected: name === selectedAlgo,
  }));

  return (
    <>
      <h2
        style={{
          color: "#FFFFFF",
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "4px",
        }}
      >
        Latency Comparison
      </h2>
      <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "12px" }}>
        Based on {baseTasks} tasks across {baseNodes} fog nodes · highlighted = your choice
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="name"
            stroke="#FFFFFF"
            tick={{ fill: "#FFFFFF", fontSize: 11 }}
            axisLine={{ stroke: "#FFFFFF" }}
            tickLine={{ stroke: "#FFFFFF" }}
          />
          <YAxis
            label={{
              value: "Latency (ms)",
              angle: -90,
              position: "insideLeft",
              fill: "#FFFFFF",
              fontSize: 12,
              fontWeight: "600",
            }}
            stroke="#FFFFFF"
            tick={{ fill: "#FFFFFF", fontSize: 11 }}
            axisLine={{ stroke: "#FFFFFF" }}
            tickLine={{ stroke: "#FFFFFF" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              color: "#FFFFFF",
            }}
            labelStyle={{ color: "#FFFFFF" }}
            formatter={(val) => [`${val} ms`, "Latency"]}
          />
          <Legend wrapperStyle={{ color: "#FFFFFF" }} />
          {result?.latency_ms && (
            <ReferenceLine
              y={result.latency_ms}
              stroke="#f43f5e"
              strokeDasharray="4 4"
              label={{ value: "Your run", fill: "#f43f5e", fontSize: 12 }}
            />
          )}
          <Bar dataKey="latency" radius={[6, 6, 0, 0]} name="Latency (ms)">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ALGO_COLORS[entry.name]}
                opacity={entry.isSelected ? 1 : 0.55}
                stroke={entry.isSelected ? "#ffffff" : "none"}
                strokeWidth={entry.isSelected ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default LatencyChart;
