from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import numpy as np
import pandas as pd
from scipy import signal
from datetime import datetime
import joblib
import json

app = FastAPI(title="Análise de Dados Sísmicos")

# Carregar modelos pré-treinados
seismic_classifier = joblib.load('models/seismic_classifier.pkl')
anomaly_detector = joblib.load('models/anomaly_detector.pkl')

class SeismicData(BaseModel):
    location: dict  # {lat: float, lon: float}
    timestamp: str
    depth: float
    data: list[float]
    sampling_rate: int

@app.post("/analyze/seismic")
async def analyze_seismic_data(data: SeismicData):
    try:
        # Processar dados sísmicos
        processed_data = process_seismic_data(data.data, data.sampling_rate)
        
        # Detectar eventos
        events = detect_events(processed_data)
        
        # Classificar eventos
        classifications = classify_events(events)
        
        # Detectar anomalias
        anomalies = detect_anomalies(processed_data)
        
        return {
            "location": data.location,
            "timestamp": data.timestamp,
            "events": [
                {
                    "start_time": event["start_time"],
                    "end_time": event["end_time"],
                    "magnitude": event["magnitude"],
                    "classification": classification
                }
                for event, classification in zip(events, classifications)
            ],
            "anomalies": anomalies,
            "analysis_timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def process_seismic_data(data: list[float], sampling_rate: int) -> np.ndarray:
    # Converter para numpy array
    signal_data = np.array(data)
    
    # Aplicar filtro passa-banda
    nyquist = sampling_rate / 2
    low = 1.0 / nyquist
    high = 20.0 / nyquist
    b, a = signal.butter(4, [low, high], btype='band')
    filtered_data = signal.filtfilt(b, a, signal_data)
    
    return filtered_data

def detect_events(data: np.ndarray) -> list[dict]:
    events = []
    # Implementar detecção de eventos usando STA/LTA
    # Short-Time Average / Long-Time Average
    sta_window = 50
    lta_window = 500
    threshold = 3.0
    
    sta = np.zeros(len(data))
    lta = np.zeros(len(data))
    
    for i in range(sta_window, len(data)):
        sta[i] = np.mean(np.abs(data[i-sta_window:i]))
    
    for i in range(lta_window, len(data)):
        lta[i] = np.mean(np.abs(data[i-lta_window:i]))
    
    ratio = sta / lta
    triggers = np.where(ratio > threshold)[0]
    
    # Agrupar triggers próximos em eventos
    if len(triggers) > 0:
        current_event = {
            "start_time": triggers[0],
            "end_time": triggers[0],
            "magnitude": float(np.max(np.abs(data[triggers[0]])))
        }
        
        for i in range(1, len(triggers)):
            if triggers[i] - triggers[i-1] > 100:  # Novo evento
                events.append(current_event)
                current_event = {
                    "start_time": triggers[i],
                    "end_time": triggers[i],
                    "magnitude": float(np.max(np.abs(data[triggers[i]])))
                }
            else:
                current_event["end_time"] = triggers[i]
                mag = float(np.max(np.abs(data[triggers[i]])))
                if mag > current_event["magnitude"]:
                    current_event["magnitude"] = mag
        
        events.append(current_event)
    
    return events

def classify_events(events: list[dict]) -> list[str]:
    # Usar modelo pré-treinado para classificar eventos
    features = np.array([
        [event["magnitude"], event["end_time"] - event["start_time"]]
        for event in events
    ])
    
    if len(features) > 0:
        return seismic_classifier.predict(features).tolist()
    return []

def detect_anomalies(data: np.ndarray) -> list[dict]:
    # Usar modelo de detecção de anomalias
    window_size = 1000
    anomalies = []
    
    for i in range(0, len(data), window_size):
        window = data[i:i+window_size]
        if len(window) == window_size:
            is_anomaly = anomaly_detector.predict([window])[0]
            if is_anomaly:
                anomalies.append({
                    "start_sample": i,
                    "end_sample": i + window_size,
                    "severity": float(np.max(np.abs(window)))
                })
    
    return anomalies 