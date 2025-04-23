from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd
from datetime import datetime
from typing import List, Optional
import joblib

app = FastAPI(title="Modelagem de Reservatórios")

# Carregar modelos
reservoir_model = joblib.load('models/reservoir_model.pkl')
production_predictor = joblib.load('models/production_predictor.pkl')

class ReservoirData(BaseModel):
    well_id: str
    timestamp: str
    depth: float
    porosity: float
    permeability: float
    pressure: float
    temperature: float
    fluid_properties: dict  # {viscosity, density, composition}
    production_history: Optional[List[dict]]  # [{timestamp, rate, pressure}]

@app.post("/analyze/reservoir")
async def analyze_reservoir(data: ReservoirData):
    try:
        # Preparar dados para análise
        features = prepare_features(data)
        
        # Estimar volume e características do reservatório
        reservoir_properties = estimate_reservoir_properties(features)
        
        # Predizer produção futura
        production_forecast = predict_production(
            data.production_history,
            reservoir_properties
        )
        
        # Calcular indicadores de performance
        performance = calculate_performance_indicators(
            data.production_history,
            production_forecast
        )
        
        return {
            "well_id": data.well_id,
            "timestamp": data.timestamp,
            "reservoir_properties": reservoir_properties,
            "production_forecast": production_forecast,
            "performance_indicators": performance,
            "recommendations": generate_recommendations(
                reservoir_properties,
                performance
            )
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def prepare_features(data: ReservoirData) -> np.ndarray:
    return np.array([
        data.depth,
        data.porosity,
        data.permeability,
        data.pressure,
        data.temperature,
        data.fluid_properties["viscosity"],
        data.fluid_properties["density"]
    ]).reshape(1, -1)

def estimate_reservoir_properties(features: np.ndarray) -> dict:
    # Usar modelo para estimar propriedades
    predictions = reservoir_model.predict(features)[0]
    
    return {
        "volume": float(predictions[0]),
        "connectivity": float(predictions[1]),
        "heterogeneity": float(predictions[2]),
        "drive_mechanism": classify_drive_mechanism(predictions[3:])
    }

def predict_production(
    history: Optional[List[dict]],
    properties: dict
) -> List[dict]:
    if not history:
        return []
    
    # Preparar dados históricos
    df = pd.DataFrame(history)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df = df.sort_values('timestamp')
    
    # Gerar previsão para próximos 12 meses
    future_dates = pd.date_range(
        start=df['timestamp'].max(),
        periods=13,
        freq='M'
    )[1:]
    
    predictions = []
    current_pressure = df['pressure'].iloc[-1]
    
    for date in future_dates:
        # Predizer taxa de produção e pressão
        features = np.array([
            current_pressure,
            properties["volume"],
            properties["connectivity"],
            properties["heterogeneity"]
        ]).reshape(1, -1)
        
        pred = production_predictor.predict(features)[0]
        rate, pressure_drop = pred[0], pred[1]
        current_pressure -= pressure_drop
        
        predictions.append({
            "timestamp": date.isoformat(),
            "rate": float(rate),
            "pressure": float(current_pressure)
        })
    
    return predictions

def calculate_performance_indicators(
    history: Optional[List[dict]],
    forecast: List[dict]
) -> dict:
    if not history:
        return {}
    
    # Calcular indicadores
    current_rate = history[-1]["rate"]
    future_rates = [p["rate"] for p in forecast]
    
    decline_rate = (
        (future_rates[0] - future_rates[-1]) /
        future_rates[0] * 100
    )
    
    cumulative_production = sum(
        h["rate"] for h in history
    ) + sum(future_rates)
    
    return {
        "current_rate": current_rate,
        "decline_rate": float(decline_rate),
        "cumulative_production": float(cumulative_production),
        "remaining_potential": estimate_remaining_potential(
            cumulative_production,
            forecast
        )
    }

def classify_drive_mechanism(features: np.ndarray) -> str:
    # Classificar mecanismo de produção
    mechanisms = [
        "water_drive",
        "gas_cap_drive",
        "solution_gas_drive",
        "combination_drive"
    ]
    return mechanisms[np.argmax(features)]

def estimate_remaining_potential(
    cumulative: float,
    forecast: List[dict]
) -> float:
    # Estimar potencial remanescente
    future_production = sum(p["rate"] for p in forecast)
    return float(future_production / cumulative * 100)

def generate_recommendations(
    properties: dict,
    performance: dict
) -> List[dict]:
    recommendations = []
    
    # Recomendações baseadas nas propriedades
    if properties["heterogeneity"] > 0.7:
        recommendations.append({
            "type": "reservoir_management",
            "priority": "high",
            "description": "Considerar técnicas de recuperação avançada",
            "reason": "Alta heterogeneidade do reservatório"
        })
    
    # Recomendações baseadas na performance
    if performance["decline_rate"] > 15:
        recommendations.append({
            "type": "production_optimization",
            "priority": "high",
            "description": "Otimizar parâmetros de produção",
            "reason": "Taxa de declínio elevada"
        })
    
    if performance["remaining_potential"] < 30:
        recommendations.append({
            "type": "field_development",
            "priority": "medium",
            "description": "Planejar desenvolvimento adicional",
            "reason": "Baixo potencial remanescente"
        })
    
    return recommendations 