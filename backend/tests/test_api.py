import unittest
from fastapi.testclient import TestClient
from app import app


class TestBackendAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_root_endpoint(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "Fog Backend Running")

    def test_health_endpoint(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)

    def test_analysis_endpoint(self):
        response = self.client.get("/analysis/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("energy_analysis", data)
        self.assertIn("qos_analysis", data)

    def test_predict_and_history_flow(self):
        # 1. Trigger prediction
        payload = {
            "fog_nodes": 12,
            "iot_tasks": 90,
            "cpu_limit": 200.0,
            "algorithm": "QoS Aware Heuristic"
        }
        pred_res = self.client.post("/predict/", json=payload)
        self.assertEqual(pred_res.status_code, 200)
        pred_data = pred_res.json()
        self.assertIn("energy_saved_percent", pred_data)
        self.assertIn("run_id", pred_data)

        # 2. Check history returns runs
        hist_res = self.client.get("/history/")
        self.assertEqual(hist_res.status_code, 200)
        hist_data = hist_res.json()
        self.assertIsInstance(hist_data, list)
        self.assertGreater(len(hist_data), 0)

    def test_settings_endpoint(self):
        res = self.client.get("/settings/")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("theme", data)


if __name__ == "__main__":
    unittest.main()
