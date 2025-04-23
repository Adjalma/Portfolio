from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
import pandas as pd
import json

app = FastAPI(title="Modelagem Preditiva de Reservas")

class SeismicData(BaseModel):
    well_id: str
    seismic_attributes: list
    production_history: list
    timestamp: str

# Carregar modelo treinado
model = load_model('models/reservoir_lstm.h5')
scaler = StandardScaler()

@app.post("/predict/reserves")
async def predict_reserves(data: SeismicData):
    try:
        # Preparar dados
        features = np.array(data.seismic_attributes + data.production_history)
        features = features.reshape(1, -1, 1)  # Reshape para LSTM
        
        # Normalizar
        features = scaler.transform(features.reshape(features.shape[0], -1))
        
        # Fazer predição
        prediction = model.predict(features)
        
        return {
            "well_id": data.well_id,
            "predicted_volume": float(prediction[0][0]),
            "confidence": float(prediction[0][1]),
            "timestamp": data.timestamp
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/wells/{well_id}/history")
async def get_well_history(well_id: str):
    try:
        # Buscar histórico do poço
        history = pd.read_csv(f'data/wells/{well_id}/history.csv')
        return history.to_dict('records')
    except Exception as e:
        raise HTTPException(status_code=404, detail="Well not found") 