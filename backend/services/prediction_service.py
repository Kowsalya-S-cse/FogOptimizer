import os
import joblib
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load scaler
scaler = joblib.load(os.path.join(BASE_DIR, "ml", "scaler.pkl"))

algo_map = {
    "FCFS": 0,
    "Reinforcement Learning": 1,
    "Bin Packing": 2,
    "QoS Aware Heuristic": 3,
    "Round Robin": 4,
}

# Latency multipliers per algorithm (lower = faster)
latency_algo_multiplier = {
    "FCFS": 1.0,
    "Round Robin": 0.80,
    "QoS Aware Heuristic": 0.57,
    "Bin Packing": 0.52,
    "Reinforcement Learning": 0.43,
}


def run_prediction(data: dict):
    algo_encoded = algo_map.get(data["algorithm"], -1)

    if algo_encoded == -1:
        return {"error": "Invalid algorithm name"}

    X = np.array([[
        data["fog_nodes"],
        data["iot_tasks"],
        data["cpu_limit"],
        algo_encoded,
    ]])

    X_scaled = scaler.transform(X)

    fog_energy = float(300 - (X_scaled[0][1] * 10))
    cloud_energy = fog_energy + 150
    energy_saved_percent = round((cloud_energy - fog_energy) / cloud_energy * 100, 2)
    qos_satisfaction = round(70 + (algo_encoded * 5), 2)
    throughput = round(data["iot_tasks"] / data["fog_nodes"], 2)

    # Dynamic latency: scales with tasks-per-node, reduced by algorithm efficiency
    base_latency = (data["iot_tasks"] / data["fog_nodes"]) * 30
    multiplier = latency_algo_multiplier.get(data["algorithm"], 1.0)
    latency_ms = round(base_latency * multiplier, 2)

    return {
        "fog_energy": round(fog_energy, 2),
        "cloud_energy": round(cloud_energy, 2),
        "energy_saved_percent": energy_saved_percent,
        "qos_satisfaction": qos_satisfaction,
        "throughput": throughput,
        "latency_ms": latency_ms,
    }
