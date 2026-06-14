import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Play, BarChart3, Info, Settings, HelpCircle, ClockIcon } from "lucide-react";

/**
 * Modern Sidebar component with active route highlighting.
 */
const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/simulate", label: "Simulation", icon: <Play size={20} /> },
    { path: "/results", label: "Results", icon: <BarChart3 size={20} /> },
    { path: "/history", label: "History", icon: <ClockIcon size={20} /> },
    { path: "/about", label: "Project Info", icon: <Info size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div style={{ flex: 1 }}>
        <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem", paddingLeft: "1rem" }}>
          Main Menu
        </div>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? "active" : ""}`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Link to="/settings" className="sidebar-link">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <Link to="/help" className="sidebar-link">
          <HelpCircle size={20} />
          <span>Help Center</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
