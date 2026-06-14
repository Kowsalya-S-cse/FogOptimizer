import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import GRU, Dense

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
X = df[["fog_nodes", "iot_tasks", "cpu_limit", "algorithm_encoded"]].values
y = df["throughput"].values

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
joblib.dump(scaler, "ml/scaler.pkl")

# Reshape for GRU [samples, timesteps, features]
X_seq = X_scaled.reshape((X_scaled.shape[0], 1, X_scaled.shape[1]))

# Build GRU model
model = Sequential()
model.add(GRU(64, input_shape=(1, X_scaled.shape[1])))
model.add(Dense(1))
model.compile(optimizer="adam", loss="mse")

# Train
model.fit(X_seq, y, epochs=30, batch_size=16, verbose=1)

# Save model
model.save("models/gru_model.h5")
print("✅ GRU model trained and saved as models/gru_model.h5")