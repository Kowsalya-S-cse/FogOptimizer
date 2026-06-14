import React, { useState, useEffect } from "react";
import { Cpu, Zap, Timer, Server } from "lucide-react";

const Dashboard = () => {
  const [energy, setEnergy] = useState(32.4);
  const [nodes, setNodes] = useState(12);
  const [latency, setLatency] = useState(42);
  const [resources, setResources] = useState(84.2);
  const [progress, setProgress] = useState(75);
  const [alerts, setAlerts] = useState([
    { id: 1, type: "error", message: "Node 7: Energy critical (<15%)" },
    { id: 2, type: "success", message: "Task Offloading: Success (Cloud)" },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => +(prev + (Math.random() - 0.5)).toFixed(1));
      setNodes(() => Math.floor(10 + Math.random() * 6));
      setLatency(() => Math.floor(35 + Math.random() * 15));
      setResources((prev) =>
        Math.min(100, Math.max(60, +(prev + (Math.random() - 0.5) * 2).toFixed(1)))
      );
      setProgress(() => Math.floor(60 + Math.random() * 40));

      // Random alert simulation
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Date.now(),
          type: Math.random() > 0.5 ? "error" : "success",
          message:
            Math.random() > 0.5
              ? "Node Overload Detected"
              : "Load Balanced Successfully",
        };
        setAlerts((prev) => [newAlert, ...prev.slice(0, 3)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Avg. Energy Savings",
      value: `${energy}%`,
      icon: <Zap color="#f59e0b" />,
      trend: "+4.2%",
    },
    {
      label: "Active Fog Nodes",
      value: `${nodes} / 15`,
      icon: <Server color="#6366f1" />,
      trend: nodes >= 12 ? "Optimal" : "Reduced",
    },
    {
      label: "Mean Latency",
      value: `${latency}ms`,
      icon: <Timer color="#10b981" />,
      trend: latency < 45 ? "-12ms" : "High",
    },
    {
      label: "Allocated Resources",
      value: `${resources}%`,
      icon: <Cpu color="#ef4444" />,
      trend: resources > 85 ? "High Load" : "Stable",
    },
  ];

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          System Overview
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Real-time monitoring of intelligent resource allocation in fog
          environments.
        </p>
      </header>

      {/* STAT CARDS */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="card stat-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--border)",
                }}
              >
                {stat.icon}
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color:
                    stat.trend.includes("High") ||
                    stat.trend.includes("Reduced")
                      ? "#ef4444"
                      : "#10b981",
                }}
              >
                {stat.trend}
              </span>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* LOWER SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
          marginTop: "1.5rem",
        }}
      >
        {/* Algorithm Status */}
        <div className="glass-card">
          <h3 style={{ marginBottom: "1.5rem" }}>
            Optimization Algorithm Status
          </h3>
          <div
            style={{
              padding: "1.5rem",
              border: "1px dashed var(--border)",
              borderRadius: "1rem",
              textAlign: "center",
            }}
          >
            <p style={{ color: "var(--text-muted)" }}>
              IEERA-Fog engine processing {nodes * 10} IoT device streams.
            </p>
            <div
              style={{
                marginTop: "1rem",
                height: "8px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "var(--primary)",
                  transition: "width 0.8s ease",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <h3 style={{ marginBottom: "1rem" }}>Recent Alerts</h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {alerts.map((alert) => (
              <li
                key={alert.id}
                style={{
                  fontSize: "0.875rem",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  color:
                    alert.type === "error" ? "#ef4444" : "#10b981",
                  background:
                    alert.type === "error"
                      ? "rgba(239,68,68,0.1)"
                      : "rgba(16,185,129,0.1)",
                  borderLeft:
                    alert.type === "error"
                      ? "3px solid #ef4444"
                      : "3px solid #10b981",
                }}
              >
                {alert.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;