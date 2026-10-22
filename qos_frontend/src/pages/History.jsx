import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, RefreshCw, Database, Download, Play } from "lucide-react";
import { fetchHistory, deleteRun } from "../services/api";

const History = () => {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleExportCSV = () => {
    if (runs.length === 0) {
      alert("No runs to export.");
      return;
    }
    const headers = [
      "Run ID",
      "Timestamp",
      "Algorithm",
      "Fog Nodes",
      "IoT Tasks",
      "CPU Limit",
      "QoS Satisfaction (%)",
      "Fog Energy (kWh)",
      "Cloud Energy (kWh)",
      "Energy Saved (%)",
      "Latency (ms)",
      "Throughput"
    ];
    const rows = runs.map((r) => [
      r.id,
      r.created_at,
      `"${r.algorithm}"`,
      r.fog_nodes,
      r.iot_tasks,
      r.cpu_limit,
      r.qos_satisfaction,
      r.fog_energy,
      r.cloud_energy,
      r.energy_saved_percent,
      r.latency_ms,
      r.throughput
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ecofog_simulation_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1150px", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <div>
          <h1 style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Database size={28} style={{ color: "var(--primary)" }} />
            Simulation History
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Persisted IoT fog resource allocation runs stored in SQLite database.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button
            className="btn"
            onClick={handleExportCSV}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            title="Download CSV report"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            className="btn"
            onClick={load}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/simulate")}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <Play size={16} /> New Simulation
          </button>
        </div>
      </header>

      {loading ? (
        <p style={{ color: "var(--text-muted)" }}>Loading records from SQLite database…</p>
      ) : runs.length === 0 ? (
        <div className="glass-card" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          <Database size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
          <p>No simulation runs yet. Go to <strong>Simulation</strong> to create one.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: 0, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "rgba(99,102,241,0.12)", color: "#94a3b8", textAlign: "left" }}>
                {["#", "Date/Time", "Algorithm", "Fog Nodes", "IoT Tasks", "CPU Limit", "QoS%", "Fog Energy", "Saved%", "Latency", "Throughput", ""].map((h) => (
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
                  <td style={{ padding: "12px 16px", color: "#fbbf24", fontWeight: 600 }}>{run.energy_saved_percent}%</td>
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
                      title="Delete run record"
                    >
                      <Trash2 size={13} />
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
