import React, { useState } from "react";
import { Play, Settings2, Database, Cpu, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { predictQoS } from "../services/api";

const SimulationForm = () => {
  const [formData, setFormData] = useState({
    fogNodes: 10,
    iotTasks: 100,
    cpuLimit: 250,
    algorithm: "QoS Aware Heuristic",
    mlModel: "LSTM" // UI only
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      // 🔑 Send frontend-style data ONLY
      const response = await predictQoS(formData);

      localStorage.setItem(
        "simulationResult",
        JSON.stringify({
          ...response,
          // Preserve inputs so Results page can use them in charts
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
      alert("Unable to connect to backend. Make sure FastAPI is running on port 8000.");
    }

    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.75rem", color: "var(--primary)" }}>
          Simulation Engine
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Configure environment parameters to evaluate the intelligent allocation algorithm.
        </p>
      </header>

      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

            <div className="form-group">
              <label className="form-label">
                <Database size={16} /> Number of Fog Nodes
              </label>
              <input
                type="number"
                name="fogNodes"
                className="form-input"
                value={formData.fogNodes}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Cpu size={16} /> Number of IoT Tasks
              </label>
              <input
                type="number"
                name="iotTasks"
                className="form-input"
                value={formData.iotTasks}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Cpu size={16} /> CPU Limit
              </label>
              <input
                type="number"
                name="cpuLimit"
                className="form-input"
                value={formData.cpuLimit}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Settings2 size={16} /> Algorithm
              </label>
              <select
                name="algorithm"
                className="form-input"
                value={formData.algorithm}
                onChange={handleChange}
              >
                <option>QoS Aware Heuristic</option>
                <option>FCFS</option>
                <option>Round Robin</option>
                <option>Bin Packing</option>
                <option>Reinforcement Learning</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ marginTop: "2rem" }}
          >
            <Play size={20} /> {loading ? "Running..." : "Launch Simulation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimulationForm;
