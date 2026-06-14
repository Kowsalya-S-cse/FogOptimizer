import pandas as pd
import joblib
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split

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

# Features and target
X = df[["fog_nodes", "iot_tasks", "cpu_limit", "algorithm_encoded"]]
y = df["energy_saved_percent"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train Decision Tree
dt_model = DecisionTreeRegressor(max_depth=5, random_state=42)
dt_model.fit(X_train, y_train)

# Save model
joblib.dump(dt_model, "models/dt_model.pkl")
print("✅ Decision Tree model trained and saved as models/dt_model.pkl")