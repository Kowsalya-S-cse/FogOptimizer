import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  User,
  Moon,
  Sun,
  Bell,
  Shield,
  Database,
} from "lucide-react";

const Settings = () => {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  // Apply theme to root HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSave = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="settings-container">
      {/* Success Message */}
      {showMessage && (
        <div className="success-message">
          ✅ Settings saved successfully!
        </div>
      )}

      {/* Header */}
      <header className="settings-header">
        <SettingsIcon size={30} />
        <div>
          <h1>System Settings</h1>
          <p>Manage your preferences and system configuration</p>
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
                <input placeholder="Enter your name" />
              </div>

              <div className="settings-group">
                <label>Email Address</label>
                <input placeholder="Enter your email" />
              </div>

              <div className="settings-group">
                <label>Backend API URL</label>
                <div className="input-wrapper">
                  <Database size={16} />
                  <input defaultValue="http://localhost:8000" />
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
                Enable system alerts
              </label>

              <label className="checkbox">
                <input type="checkbox" />
                Enable email notifications
              </label>
            </>
          )}

          {/* SECURITY SECTION */}
          {activeSection === "security" && (
            <>
              <h3>Security & Privacy</h3>

              <div className="settings-group">
                <label>Change Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>

              <div className="settings-group">
                <label>Two Factor Authentication</label>
                <select>
                  <option>Disabled</option>
                  <option>Enabled</option>
                </select>
              </div>

              <div className="settings-group">
                <label>System Appearance</label>
                <div className="theme-buttons">
                  <button
                    className={theme === "dark" ? "active" : ""}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon size={16} /> Dark
                  </button>

                  <button
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
          <button className="save-btn" onClick={handleSave}>
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
  >
    {icon}
    <span>{text}</span>
  </div>
);

export default Settings;