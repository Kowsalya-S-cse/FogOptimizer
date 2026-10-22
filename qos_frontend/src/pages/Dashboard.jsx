import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, Zap, Timer, Server, Play, BarChart2, Database, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [energy, setEnergy] = useState(38.4);
  const [nodes, setNodes] = useState(12);
  const [latency, setLatency] = useState(42);
  const [resources, setResources] = useState(84.2);
  const [progress, setProgress] = useState(75);
  const [alerts, setAlerts] = useState([
    { id: 1, type: "error", message: "Node 7: High load threshold reached (>85%)" },
    { id: 2, type: "success", message: "Task Offloading: Optimal Fog-Cloud partition" },
    { id: 3, type: "success", message: "QoS Deadline Guarantee: 94.2% satisfied" },
  ]);

  // Simulate real-time live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => +(prev + (Math.random() - 0.5) * 0.4).toFixed(1));
      setNodes(() => Math.floor(10 + Math.random() * 5));
      setLatency(() => Math.floor(38 + Math.random() * 10));
      setResources((prev) =>
        Math.min(95, Math.max(65, +(prev + (Math.random() - 0.5) * 1.5).toFixed(1)))
      );
      setProgress(() => Math.floor(70 + Math.random() * 25));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Avg. Energy Savings",
      value: `${energy}%`,
      icon: <Zap color="#f59e0b" />,
      trend: "+4.2% vs Cloud",
      target: "/results",
    },
    {
      label: "Active Fog Nodes",
      value: `${nodes} / 15`,
      icon: <Server color="#6366f1" />,
      trend: "Online",
      target: "/simulate",
    },
    {
      label: "Mean Latency",
      value: `${latency}ms`,
      icon: <Timer color="#10b981" />,
      trend: "-18ms vs Cloud",
      target: "/results",
    },
    {
      label: "Fog Resource Utilization",
      value: `${resources}%`,
      icon: <Cpu color="#ef4444" />,
      trend: "Balanced",
      target: "/history",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* HEADER WITH CALL-TO-ACTION BUTTONS */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Fog System Overview
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Real-time monitoring of intelligent energy-efficient resource allocation (IEERA-Fog).
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={() => navigate("/simulate")}
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem" }}
          >
            <Play size={16} /> Run Simulation
          </button>
          <button
            onClick={() => navigate("/results")}
            className="btn"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem" }}
          >
            <BarChart2 size={16} /> View Results
          </button>
        </div>
      </header>

      {/* STAT CARDS (CLICKABLE) */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card stat-card"
            onClick={() => navigate(stat.target)}
            style={{ cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.borderColor = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
            title={`Click to view ${stat.label}`}
          >
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
                  color: "#10b981",
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
        {/* Algorithm Status & Quick Actions */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3>Optimization Engine Status</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: "600" }}>Active Model: Random Forest</span>
          </div>

          <div
            style={{
              padding: "1.5rem",
              border: "1px dashed var(--border)",
              borderRadius: "1rem",
              textAlign: "center",
              background: "rgba(0,0,0,0.15)",
            }}
          >
            <p style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              IEERA-Fog engine dynamically offloading {nodes * 12} concurrent IoT micro-tasks.
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
                  background: "linear-gradient(90deg, #6366f1, #38bdf8)",
                  transition: "width 0.8s ease",
                }}
              ></div>
            </div>
            <div style={{ marginTop: "0.6rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Engine Efficiency: {progress}% Optimal Load Partition
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
            <button
              onClick={() => navigate("/simulate")}
              className="btn btn-primary"
              style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.4rem", padding: "0.75rem" }}
            >
              <span>Configure Simulation</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/history")}
              className="btn"
              style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.4rem", padding: "0.75rem" }}
            >
              <Database size={16} />
              <span>Browse History</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3>Recent Telemetry</h3>
            <span style={{ fontSize: "0.75rem", color: "#10b981" }}>Live Feed</span>
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              padding: 0,
              margin: 0,
            }}
          >
            {alerts.map((alert) => (
              <li
                key={alert.id}
                style={{
                  fontSize: "0.85rem",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "0.5rem",
                  color: alert.type === "error" ? "#fca5a5" : "#6ee7b7",
                  background:
                    alert.type === "error"
                      ? "rgba(239,68,68,0.12)"
                      : "rgba(16,185,129,0.12)",
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