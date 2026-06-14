import axios from "axios";

// Base URL of FastAPI backend (port 8001)
const API_BASE_URL = "http://127.0.0.1:8001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
    throw error.response?.data || { error: "Backend not reachable" };
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

export default api;
