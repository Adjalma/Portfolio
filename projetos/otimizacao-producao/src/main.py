from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime, timedelta
import joblib

app = FastAPI(title="Otimização de Produção com ML")

# Carregar modelo treinado
production_model = joblib.load('models/production_optimizer.pkl')

class ProductionData(BaseModel):
    well_id: str
    current_parameters: dict  # {parameter: value}
    production_history: list[dict]
    constraints: dict  # {parameter: {min: value, max: value}}

@app.post("/optimize/production")
async def optimize_production(data: ProductionData):
    try:
        # Preparar dados para otimização
        X = prepare_features(data)
        
        # Gerar recomendações de parâmetros
        optimal_params = optimize_parameters(
            X,
            data.current_parameters,
            data.constraints
        )
        
        # Prever produção com parâmetros otimizados
        predicted_production = predict_production(optimal_params)
        
        return {
            "well_id": data.well_id,
            "optimal_parameters": optimal_params,
            "predicted_production": float(predicted_production),
            "improvement_percentage": calculate_improvement(
                data.current_parameters,
                optimal_params
            ),
            "recommendations": generate_recommendations(
                data.current_parameters,
                optimal_params
            )
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def prepare_features(data: ProductionData) -> np.ndarray:
    features = []
    for param, value in data.current_parameters.items():
        features.append(value)
    return np.array(features).reshape(1, -1)

def optimize_parameters(
    X: np.ndarray,
    current_params: dict,
    constraints: dict
) -> dict:
    # Implementar algoritmo de otimização
    # (ex: Bayesian Optimization, Genetic Algorithm)
    optimized = {}
    for param, value in current_params.items():
        if param in constraints:
            min_val = constraints[param]['min']
            max_val = constraints[param]['max']
            # Simular otimização
            optimized[param] = np.clip(
                value * (1 + np.random.normal(0, 0.1)),
                min_val,
                max_val
            )
    return optimized

def predict_production(parameters: dict) -> float:
    X = np.array(list(parameters.values())).reshape(1, -1)
    return production_model.predict(X)[0]

def calculate_improvement(
    current: dict,
    optimal: dict
) -> float:
    current_prod = predict_production(current)
    optimal_prod = predict_production(optimal)
    return ((optimal_prod - current_prod) / current_prod) * 100

def generate_recommendations(
    current: dict,
    optimal: dict
) -> list[dict]:
    recommendations = []
    for param, opt_value in optimal.items():
        curr_value = current[param]
        if abs(opt_value - curr_value) / curr_value > 0.05:
            recommendations.append({
                "parameter": param,
                "current_value": curr_value,
                "recommended_value": opt_value,
                "change_percentage": ((opt_value - curr_value) / curr_value) * 100
            })
    return recommendations 