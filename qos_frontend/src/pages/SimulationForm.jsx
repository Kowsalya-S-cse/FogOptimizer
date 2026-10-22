import React, { useState } from "react";
import { Play, Settings2, Database, Cpu, Sparkles, Server } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { predictQoS } from "../services/api";

const SimulationForm = () => {
  const [formData, setFormData] = useState({
    fogNodes: 10,
    iotTasks: 100,
    cpuLimit: 250,
    algorithm: "QoS Aware Heuristic",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const presets = [
    {
      name: "Industrial IoT",
      fogNodes: 15,
      iotTasks: 350,
      cpuLimit: 300,
      algorithm: "QoS Aware Heuristic",
      desc: "High reliability & energy conservation"
    },
    {
      name: "Connected Vehicles",
      fogNodes: 25,
      iotTasks: 1200,
      cpuLimit: 450,
      algorithm: "Reinforcement Learning",
      desc: "Ultra-low latency offloading"
    },
    {
      name: "Smart Healthcare",
      fogNodes: 8,
      iotTasks: 120,
      cpuLimit: 200,
      algorithm: "Bin Packing",
      desc: "Strict deadline satisfaction"
    },
    {
      name: "Legacy Baseline",
      fogNodes: 10,
      iotTasks: 100,
      cpuLimit: 250,
      algorithm: "FCFS",
      desc: "First Come First Serve reference"
    }
  ];

  const handleApplyPreset = (p) => {
    setFormData({
      fogNodes: p.fogNodes,
      iotTasks: p.iotTasks,
      cpuLimit: p.cpuLimit,
      algorithm: p.algorithm,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await predictQoS(formData);

      localStorage.setItem(
        "simulationResult",
        JSON.stringify({
          ...response,
          fog_nodes: Number(formData.fogNodes),
          iot_tasks: Number(formData.iotTasks),
          cpu_limit: Number(formData.cpuLimit),
          algorithm: formData.algorithm,
        })
      );

      console.log("✅ Backend response:", response);
      navigate("/results");
    } catch (error) {
      console.error("❌ Simulation error:", error);
      alert(
        error.error ||
          "Unable to connect to backend. Please ensure the FastAPI server is running on port 8000."
      );
    }

    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "920px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "var(--primary)" }}>
          Simulation Engine
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Configure edge-fog parameters to evaluate real-time scheduling and energy optimization.
        </p>
      </header>

      {/* QUICK PRESETS */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Sparkles size={16} color="var(--primary)" />
          <span>Quick Evaluation Presets (Click to Auto-fill):</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
          {presets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              style={{
                background: formData.algorithm === preset.algorithm && Number(formData.fogNodes) === preset.fogNodes ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                border: formData.algorithm === preset.algorithm && Number(formData.fogNodes) === preset.fogNodes ? "1px solid var(--primary)" : "1px solid var(--border)",
                borderRadius: "0.75rem",
                padding: "0.75rem",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ fontWeight: "600", fontSize: "0.88rem", color: "#f8fafc", marginBottom: "0.2rem" }}>{preset.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{preset.desc}</div>
              <div style={{ fontSize: "0.72rem", color: "#818cf8", marginTop: "0.4rem" }}>
                {preset.fogNodes} nodes · {preset.iotTasks} tasks · {preset.algorithm}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.75rem" }}>

            <div className="form-group">
              <label className="form-label">
                <Server size={16} color="var(--primary)" /> Number of Fog Nodes
              </label>
              <input
                type="number"
                name="fogNodes"
                min="1"
                max="100"
                className="form-input"
                value={formData.fogNodes}
                onChange={handleChange}
                required
              />
              <small style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Available edge gateways (1 - 100)</small>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Cpu size={16} color="var(--primary)" /> Number of IoT Tasks
              </label>
              <input
                type="number"
                name="iotTasks"
                min="1"
                max="3000"
                className="form-input"
                value={formData.iotTasks}
                onChange={handleChange}
                required
              />
              <small style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Concurrent incoming sensor tasks (1 - 3000)</small>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Database size={16} color="var(--primary)" /> CPU Capacity Limit (MIPS)
              </label>
              <input
                type="number"
                name="cpuLimit"
                min="50"
                max="1000"
                className="form-input"
                value={formData.cpuLimit}
                onChange={handleChange}
                required
              />
              <small style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Compute power per fog node</small>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Settings2 size={16} color="var(--primary)" /> Scheduling Algorithm
              </label>
              <select
                name="algorithm"
                className="form-input"
                value={formData.algorithm}
                onChange={handleChange}
              >
                <option value="QoS Aware Heuristic">QoS Aware Heuristic (Proposed IEERA)</option>
                <option value="Reinforcement Learning">Reinforcement Learning (Q-Learning)</option>
                <option value="Bin Packing">Bin Packing (First Fit Decreasing)</option>
                <option value="Round Robin">Round Robin</option>
                <option value="FCFS">FCFS (First Come First Serve)</option>
              </select>
              <small style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Resource scheduling strategy</small>
            </div>

          </div>

          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ padding: "0.85rem 2rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem" }}
            >
              <Play size={18} />
              <span>{loading ? "Evaluating Model..." : "Launch Simulation & Predict"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimulationForm;
