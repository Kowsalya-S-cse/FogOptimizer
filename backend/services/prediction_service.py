import os
import joblib
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Canonical algorithm map matching training dataset
algo_map = {
    "FCFS": 0,
    "Round Robin": 1,
    "Bin Packing": 2,
    "QoS Aware Heuristic": 3,
    "Reinforcement Learning": 4,
}

# Latency multipliers per algorithm (lower = faster)
latency_algo_multiplier = {
    "FCFS": 1.0,
    "Round Robin": 0.80,
    "QoS Aware Heuristic": 0.57,
    "Bin Packing": 0.52,
    "Reinforcement Learning": 0.43,
}

# Load trained Random Forest model & Scaler
rf_model_path = os.path.join(BASE_DIR, "models", "rf_model.pkl")
dt_model_path = os.path.join(BASE_DIR, "models", "dt_model.pkl")

ml_model = None
try:
    if os.path.exists(rf_model_path):
        ml_model = joblib.load(rf_model_path)
    elif os.path.exists(dt_model_path):
        ml_model = joblib.load(dt_model_path)
except Exception as e:
    print(f"Warning: could not load ML model: {e}")


def run_prediction(data: dict):
    algorithm_name = data.get("algorithm", "QoS Aware Heuristic")
    algo_encoded = algo_map.get(algorithm_name, -1)

    if algo_encoded == -1:
        return {"error": f"Invalid algorithm name: {algorithm_name}"}

    fog_nodes = max(1, int(data.get("fog_nodes", 10)))
    iot_tasks = max(1, int(data.get("iot_tasks", 100)))
    cpu_limit = float(data.get("cpu_limit", 250))

    # Features: [fog_nodes, iot_tasks, cpu_limit, algorithm_encoded]
    X = np.array([[fog_nodes, iot_tasks, cpu_limit, algo_encoded]])

    if ml_model is not None:
        try:
            preds = ml_model.predict(X)[0]
            # targets: ["fog_energy", "cloud_energy", "energy_saved_percent", "qos_satisfaction", "throughput"]
            fog_energy = float(preds[0])
            cloud_energy = float(preds[1])
            energy_saved_percent = float(preds[2])
            qos_satisfaction = float(preds[3])
            throughput = float(preds[4])
        except Exception as e:
            print(f"Inference exception: {e}, using heuristic fallback")
            fog_energy = float(180 + (iot_tasks / fog_nodes) * 5)
            cloud_energy = fog_energy * 1.6
            energy_saved_percent = round((cloud_energy - fog_energy) / cloud_energy * 100, 2)
            qos_satisfaction = float(75 + (algo_encoded * 5))
            throughput = float(iot_tasks / fog_nodes)
    else:
        fog_energy = float(180 + (iot_tasks / fog_nodes) * 5)
        cloud_energy = fog_energy * 1.6
        energy_saved_percent = round((cloud_energy - fog_energy) / cloud_energy * 100, 2)
        qos_satisfaction = float(75 + (algo_encoded * 5))
        throughput = float(iot_tasks / fog_nodes)

    # Dynamic Latency calculation based on load and algorithm efficiency
    base_latency = (iot_tasks / fog_nodes) * 30
    multiplier = latency_algo_multiplier.get(algorithm_name, 1.0)
    latency_ms = round(base_latency * multiplier, 2)

    return {
        "fog_energy": round(max(10.0, fog_energy), 2),
        "cloud_energy": round(max(fog_energy + 10, cloud_energy), 2),
        "energy_saved_percent": round(min(99.0, max(5.0, energy_saved_percent)), 2),
        "qos_satisfaction": round(min(100.0, max(50.0, qos_satisfaction)), 2),
        "throughput": round(max(0.1, throughput), 2),
        "latency_ms": latency_ms,
    }
