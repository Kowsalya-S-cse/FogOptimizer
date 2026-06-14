import React from "react";
import { Activity, Bell, User } from "lucide-react";

/**
 * Premium Navbar component for the Fog Computing project.
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <Activity size={24} />
        <span>FogOptimizer <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: "normal" }}>v1.0</span></span>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <div className="badge">AI Engine: Active</div>
        <div style={{ color: "var(--text-muted)", cursor: "pointer" }}>
          <Bell size={20} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.05)", padding: "0.25rem 0.75rem", borderRadius: "2rem", border: "1px solid var(--border)" }}>
          <User size={18} />
          <span style={{ fontSize: "0.875rem" }}>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
