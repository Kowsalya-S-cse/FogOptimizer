import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";

/**
 * Premium Footer with social links and project details.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ display: "flex", flex: 1, justifyContent: "space-between", alignItems: "center" }}>
        <p>Intelligent Fog Resource Allocation © 2026</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Github size={18} style={{ cursor: "pointer", color: "var(--text-muted)" }} />
          <Twitter size={18} style={{ cursor: "pointer", color: "var(--text-muted)" }} />
          <Linkedin size={18} style={{ cursor: "pointer", color: "var(--text-muted)" }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
