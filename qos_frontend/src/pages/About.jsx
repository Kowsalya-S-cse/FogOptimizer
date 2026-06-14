import React from "react";
import { Info, BookOpen, Target, ShieldCheck } from "lucide-react";

/**
 * About page detailing project objectives and background.
 */
const About = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Project Info</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.125rem" }}>
          Intelligent Energy-Efficient Resource Allocation for Fog-Based IoT Applications.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--primary)", marginBottom: "1rem" }}>
            <Target size={24} />
            <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem" }}>Problem</h3>
          </div>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Managing limited fog resources to handle dynamic workloads while minimizing energy and satisfying QoS deadlines.
          </p>
        </div>

        <div className="glass-card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--success)", marginBottom: "1rem" }}>
            <ShieldCheck size={24} />
            <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem" }}>Solution</h3>
          </div>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Implementation of the IEERA-Fog algorithm for intelligent offloading and priority-based scheduling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
