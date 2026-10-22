import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, LogIn, Activity, Sparkles } from "lucide-react";

/**
 * Modern Glassmorphism Login Page
 * Serves as the primary entry point for the application.
 */
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.password) {
      onLogin(true);
    } else {
      alert("Please fill in all credentials.");
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      username: "Kowsalya S",
      email: "kowsalya@fogoptimizer.ai",
      password: "secure_admin_pass"
    });
    setTimeout(() => {
      onLogin(true);
    }, 200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-page">
      <div className="glass-card login-card">
        <div className="login-header">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <div style={{ padding: "1rem", background: "rgba(99, 102, 241, 0.1)", borderRadius: "1.25rem", border: "1px solid var(--border)" }}>
              <Activity size={40} color="var(--primary)" />
            </div>
          </div>
          <h1>EcoFog AI System</h1>
          <p style={{ color: "var(--text-muted)" }}>Intelligent Fog Resource & QoS Optimizer</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <User size={18} className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username / Engineer ID"
              className="form-input login-input"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Identity"
              className="form-input login-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Security Key"
              className="form-input login-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div 
              style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "var(--text-muted)" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "0.85rem" }}>
            <LogIn size={18} />
            <span>Authenticate Session</span>
          </button>
        </form>

        {/* Instant Demo Login for Interviewers / HR */}
        <div style={{ marginTop: "1rem" }}>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="btn"
            style={{
              width: "100%",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              borderRadius: "0.75rem"
            }}
          >
            <Sparkles size={16} />
            <span>⚡ Quick Demo Access</span>
          </button>
        </div>

        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Developed for Intelligent Fog-Edge Resource Optimization
        </div>
      </div>
    </div>
  );
};

export default Login;
