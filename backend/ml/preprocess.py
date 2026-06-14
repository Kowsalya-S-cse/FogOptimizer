import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib

# Load dataset
df = pd.read_csv("fog_scheduling_dataset_custom_algo.csv")

# Encode algorithm
algo_map = {
    "Reinforcement Learning": 0,
    "QoS-aware Heuristic": 1,
    "Energy-Optimized Bin Packing": 2,
    "FCFS": 3,
    "Round Robin": 4
}
df["algorithm_encoded"] = df["algorithm"].map(algo_map)

# Features
X = df[["fog_nodes", "iot_tasks", "cpu_limit", "algorithm_encoded"]]

# Fit scaler
scaler = StandardScaler().fit(X)
joblib.dump(scaler, "ml/scaler.pkl")
print("✅ Scaler saved")