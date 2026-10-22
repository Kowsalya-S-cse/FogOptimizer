import axios from "axios";
import config from "../config";

const API_BASE_URL = config.API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ── Prediction ────────────────────────────────────────────────────────────────
export const predictQoS = async (formData) => {
  try {
    const payload = {
      fog_nodes: Number(formData.fogNodes),
      iot_tasks: Number(formData.iotTasks),
      cpu_limit: Number(formData.cpuLimit),
      algorithm: formData.algorithm,
    };
    console.log("📤 Sending to backend:", payload);
    const response = await api.post("/predict/", payload);
    return response.data;
  } catch (error) {
    console.error("❌ Error calling backend:", error);
    throw error.response?.data || { error: "Backend not reachable on " + API_BASE_URL };
  }
};

// ── History ───────────────────────────────────────────────────────────────────
export const fetchHistory = async () => {
  try {
    const response = await api.get("/history/");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching history:", error);
    return [];
  }
};

export const deleteRun = async (runId) => {
  try {
    await api.delete(`/history/${runId}`);
    return true;
  } catch (error) {
    console.error("❌ Error deleting run:", error);
    return false;
  }
};

// ── Settings ──────────────────────────────────────────────────────────────────
export const fetchSettings = async () => {
  try {
    const response = await api.get("/settings/");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching settings:", error);
    return { theme: "dark", notifications_enabled: true };
  }
};

export const saveSettings = async (settings) => {
  try {
    const response = await api.post("/settings/", settings);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving settings:", error);
    return null;
  }
};

// ── Analysis ──────────────────────────────────────────────────────────────────
export const fetchAnalysis = async () => {
  try {
    const response = await api.get("/analysis/");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching analysis:", error);
    return null;
  }
};

export default api;
