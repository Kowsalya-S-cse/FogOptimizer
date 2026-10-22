import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  User,
  Moon,
  Sun,
  Bell,
  Shield,
  Database,
  CheckCircle2
} from "lucide-react";
import { fetchSettings, saveSettings } from "../services/api";

const Settings = () => {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [fullName, setFullName] = useState("Kowsalya S");
  const [email, setEmail] = useState("kowsalya@fogoptimizer.ai");

  useEffect(() => {
    // Load from backend SQLite
    const load = async () => {
      const data = await fetchSettings();
      if (data) {
        if (data.theme) setTheme(data.theme);
        if (typeof data.notifications_enabled === "boolean") {
          setNotifications(data.notifications_enabled);
        }
      }
    };
    load();
  }, []);

  // Apply theme to root HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSave = async () => {
    await saveSettings({
      theme: theme,
      notifications_enabled: notifications
    });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="settings-container">
      {/* Success Message */}
      {showMessage && (
        <div className="success-message" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckCircle2 size={18} color="#10b981" />
          <span>Settings saved and synced to SQLite database successfully!</span>
        </div>
      )}

      {/* Header */}
      <header className="settings-header">
        <SettingsIcon size={30} color="var(--primary)" />
        <div>
          <h1>System Settings</h1>
          <p>Manage your preferences, backend connection and system configuration</p>
        </div>
      </header>

      <div className="settings-layout">
        {/* Sidebar */}
        <aside className="settings-sidebar">
          <SidebarItem
            icon={<User />}
            text="Profile Settings"
            active={activeSection === "profile"}
            onClick={() => setActiveSection("profile")}
          />

          <SidebarItem
            icon={<Bell />}
            text="Notifications"
            active={activeSection === "notifications"}
            onClick={() => setActiveSection("notifications")}
          />

          <SidebarItem
            icon={<Shield />}
            text="Security & Privacy"
            active={activeSection === "security"}
            onClick={() => setActiveSection("security")}
          />
        </aside>

        {/* Main Panel */}
        <section className="settings-panel">

          {/* PROFILE SECTION */}
          {activeSection === "profile" && (
            <>
              <h3>Profile Settings</h3>

              <div className="settings-group">
                <label>Full Name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="settings-group">
                <label>Email Address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="settings-group">
                <label>Backend API URL</label>
                <div className="input-wrapper">
                  <Database size={16} />
                  <input readOnly value="http://127.0.0.1:8000" style={{ opacity: 0.8 }} />
                </div>
              </div>
            </>
          )}

          {/* NOTIFICATIONS SECTION */}
          {activeSection === "notifications" && (
            <>
              <h3>Notification Settings</h3>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                Enable real-time telemetry alerts
              </label>

              <label className="checkbox">
                <input type="checkbox" defaultChecked />
                Log simulation runs to database automatically
              </label>
            </>
          )}

          {/* SECURITY SECTION */}
          {activeSection === "security" && (
            <>
              <h3>Security & Privacy</h3>

              <div className="settings-group">
                <label>Session Authentication</label>
                <select defaultValue="token">
                  <option value="token">JWT Token Header (Bearer)</option>
                  <option value="basic">Admin Password Hash</option>
                </select>
              </div>

              <div className="settings-group">
                <label>System Appearance</label>
                <div className="theme-buttons">
                  <button
                    type="button"
                    className={theme === "dark" ? "active" : ""}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon size={16} /> Dark
                  </button>

                  <button
                    type="button"
                    className={theme === "light" ? "active" : ""}
                    onClick={() => setTheme("light")}
                  >
                    <Sun size={16} /> Light
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Save Button */}
          <button className="save-btn" onClick={handleSave} style={{ marginTop: "1.5rem" }}>
            Save All Changes
          </button>
        </section>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick }) => (
  <div
    className={`sidebar-item ${active ? "active" : ""}`}
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    {icon}
    <span>{text}</span>
  </div>
);

export default Settings;