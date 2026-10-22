import unittest
from services.prediction_service import run_prediction, algo_map


class TestPredictionService(unittest.TestCase):
    def test_all_supported_algorithms(self):
        for algo in algo_map.keys():
            res = run_prediction({
                "fog_nodes": 15,
                "iot_tasks": 120,
                "cpu_limit": 250,
                "algorithm": algo
            })
            self.assertNotIn("error", res, f"Algorithm {algo} should not return an error")
            self.assertIn("fog_energy", res)
            self.assertIn("cloud_energy", res)
            self.assertIn("energy_saved_percent", res)
            self.assertIn("qos_satisfaction", res)
            self.assertIn("throughput", res)
            self.assertIn("latency_ms", res)
            self.assertGreater(res["fog_energy"], 0)
            self.assertGreater(res["cloud_energy"], res["fog_energy"])
            self.assertTrue(0 <= res["qos_satisfaction"] <= 100)

    def test_invalid_algorithm(self):
        res = run_prediction({
            "fog_nodes": 10,
            "iot_tasks": 100,
            "cpu_limit": 200,
            "algorithm": "UnknownAlgorithm"
        })
        self.assertIn("error", res)

    def test_edge_case_inputs(self):
        # 1 node, many tasks
        res = run_prediction({
            "fog_nodes": 1,
            "iot_tasks": 500,
            "cpu_limit": 100,
            "algorithm": "Reinforcement Learning"
        })
        self.assertNotIn("error", res)
        self.assertGreater(res["latency_ms"], 0)
        self.assertGreater(res["throughput"], 0)


if __name__ == "__main__":
    unittest.main()
