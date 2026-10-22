import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Bell, User, Settings, CheckCircle2 } from "lucide-react";

/**
 * Premium Navbar component for the Fog Computing project with full clickability.
 */
const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar" style={{ position: "relative" }}>
      <Link to="/" className="logo-section" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Activity size={24} color="var(--primary)" />
          <span style={{ fontWeight: "700", fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
            EcoFog<span style={{ color: "var(--primary)" }}>AI</span>{" "}
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: "normal" }}>v1.1</span>
          </span>
        </div>
      </Link>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <div className="badge" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
          <span>AI Engine: Online</span>
        </div>

        {/* Clickable Notifications */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "6px",
              borderRadius: "50%",
            }}
            title="Notifications"
          >
            <Bell size={20} />
          </button>

          {showNotifications && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "2.5rem",
                width: "280px",
                background: "#0f172a",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                padding: "1rem",
                zIndex: 100,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: "600" }}>
                <span>System Alerts</span>
                <span style={{ color: "var(--primary)", cursor: "pointer", fontSize: "0.75rem" }} onClick={() => setShowNotifications(false)}>Close</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <CheckCircle2 size={14} color="#10b981" style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span>Random Forest Model loaded & ready for inference</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <CheckCircle2 size={14} color="#38bdf8" style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span>SQLite database synced on startup</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clickable Admin Profile Button */}
        <div
          onClick={() => navigate("/settings")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "rgba(255,255,255,0.06)",
            padding: "0.35rem 0.85rem",
            borderRadius: "2rem",
            border: "1px solid var(--border)",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          title="Go to Settings"
        >
          <User size={16} color="var(--primary)" />
          <span style={{ fontSize: "0.85rem", fontWeight: "500" }}>Admin</span>
          <Settings size={14} color="var(--text-muted)" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
