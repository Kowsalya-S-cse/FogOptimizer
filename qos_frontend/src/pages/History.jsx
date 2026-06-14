import React, { useEffect, useState } from "react";
import { Trash2, RefreshCw, Database } from "lucide-react";
import { fetchHistory, deleteRun } from "../services/api";

const History = () => {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchHistory();
    setRuns(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete run #${id}?`)) return;
    await deleteRun(id);
    load();
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Database size={28} style={{ color: "var(--primary)" }} />
            Simulation History
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            All past simulation runs stored in the database. Change your inputs and re-run to compare.
          </p>
        </div>
        <button className="btn" onClick={load} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <RefreshCw size={16} /> Refresh
        </button>
      </header>

      {loading ? (
        <p style={{ color: "var(--text-muted)" }}>Loading…</p>
      ) : runs.length === 0 ? (
        <div className="glass-card" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          <Database size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
          <p>No simulation runs yet. Go to <strong>Simulation</strong> to create one.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "rgba(99,102,241,0.12)", color: "#94a3b8", textAlign: "left" }}>
                {["#", "Date/Time", "Algorithm", "Fog Nodes", "IoT Tasks", "CPU Limit", "QoS%", "Fog Energy", "Energy Saved%", "Latency (ms)", "Throughput", ""].map((h) => (
                  <th key={h} style={{ padding: "14px 16px", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {runs.map((run, i) => (
                <tr
                  key={run.id}
                  style={{
                    borderTop: "1px solid #1e293b",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)")}
                >
                  <td style={{ padding: "12px 16px", color: "#6366f1", fontWeight: 700 }}>#{run.id}</td>
                  <td style={{ padding: "12px 16px", color: "#94a3b8", whiteSpace: "nowrap" }}>
                    {new Date(run.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      background: "rgba(99,102,241,0.18)",
                      color: "#a5b4fc",
                      borderRadius: "99px",
                      padding: "3px 10px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}>
                      {run.algorithm}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>{run.fog_nodes}</td>
                  <td style={{ padding: "12px 16px" }}>{run.iot_tasks}</td>
                  <td style={{ padding: "12px 16px" }}>{run.cpu_limit}</td>
                  <td style={{ padding: "12px 16px", color: "#4ade80", fontWeight: 600 }}>{run.qos_satisfaction}%</td>
                  <td style={{ padding: "12px 16px", color: "#6ceeff" }}>{run.fog_energy} kWh</td>
                  <td style={{ padding: "12px 16px", color: "#fbbf24" }}>{run.energy_saved_percent}%</td>
                  <td style={{ padding: "12px 16px", color: "#f87171" }}>{run.latency_ms} ms</td>
                  <td style={{ padding: "12px 16px" }}>{run.throughput}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => handleDelete(run.id)}
                      style={{
                        background: "none",
                        border: "1px solid #ef4444",
                        color: "#ef4444",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.78rem",
                      }}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
