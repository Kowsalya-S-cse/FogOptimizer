import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score, mean_absolute_error

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(BASE_DIR, "fog_scheduling_dataset_custom_algo.csv")
MODELS_DIR = os.path.join(BASE_DIR, "models")
ML_DIR = os.path.join(BASE_DIR, "ml")

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(ML_DIR, exist_ok=True)

# 1. Load dataset
df = pd.read_csv(CSV_PATH)
print(f"Loaded dataset: {df.shape[0]} rows, {df.shape[1]} columns")

# 2. Canonical algorithm mapping
ALGO_MAP = {
    "FCFS": 0,
    "Round Robin": 1,
    "Bin Packing": 2,
    "QoS Aware Heuristic": 3,
    "Reinforcement Learning": 4,
}

df["algorithm_encoded"] = df["algorithm"].map(ALGO_MAP)
if df["algorithm_encoded"].isnull().any():
    print("Warning: some algorithm values were unmapped:", df[df["algorithm_encoded"].isnull()]["algorithm"].unique())
    df["algorithm_encoded"] = df["algorithm_encoded"].fillna(0).astype(int)

# 3. Features and Targets
feature_cols = ["fog_nodes", "iot_tasks", "cpu_limit", "algorithm_encoded"]
target_cols = ["fog_energy", "cloud_energy", "energy_saved_percent", "qos_satisfaction", "throughput"]

X = df[feature_cols].values
y = df[target_cols].values

# 4. Fit and save Scaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
joblib.dump(scaler, os.path.join(ML_DIR, "scaler.pkl"))
print("Saved scaler.pkl")

# 5. Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 6. Train Random Forest Regressor (Multi-output)
rf_model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42, n_jobs=-1)
rf_model.fit(X_train, y_train)

y_pred = rf_model.predict(X_test)
r2 = r2_score(y_test, y_pred, multioutput='uniform_average')
mae = mean_absolute_error(y_test, y_pred)
print(f"Random Forest Model Performance -> R2: {r2:.4f}, MAE: {mae:.4f}")

# 7. Also train Decision Tree for comparison
dt_model = DecisionTreeRegressor(max_depth=8, random_state=42)
dt_model.fit(X_train, y_train)
dt_r2 = r2_score(y_test, dt_model.predict(X_test), multioutput='uniform_average')
print(f"Decision Tree Model Performance -> R2: {dt_r2:.4f}")

# 8. Save models
joblib.dump(rf_model, os.path.join(MODELS_DIR, "rf_model.pkl"))
joblib.dump(dt_model, os.path.join(MODELS_DIR, "dt_model.pkl"))
joblib.dump({
    "r2_score": float(r2),
    "mae": float(mae),
    "feature_names": feature_cols,
    "target_names": target_cols,
    "algo_map": ALGO_MAP,
    "dataset_size": len(df)
}, os.path.join(MODELS_DIR, "model_metrics.pkl"))

print("All models and metadata successfully trained and exported!")
