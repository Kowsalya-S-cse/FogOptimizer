import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import SimulationForm from "./pages/SimulationForm";
import Results from "./pages/Results";
import History from "./pages/History";
import About from "./pages/About";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import Docs from "./pages/Docs";
import Community from "./pages/Community";
import Login from "./pages/Login";

import "./styles/main.css";

const MainApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔒 Login guard
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  // ✅ Main app layout
  return (
    <Router>
      <div className="layout-root">
        <Navbar />

        <div className="layout-body">
          <Sidebar />

          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/simulate" element={<SimulationForm />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/community" element={<Community />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default MainApp;