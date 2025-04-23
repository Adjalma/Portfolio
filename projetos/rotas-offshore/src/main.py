from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from datetime import datetime
import pandas as pd
from typing import List
import json

app = FastAPI(title="Otimização de Rotas Offshore")

class RouteRequest(BaseModel):
    origin: dict  # {lat: float, lon: float}
    destination: dict  # {lat: float, lon: float}
    vessel_type: str
    departure_time: str
    constraints: dict  # {max_wave_height: float, min_visibility: float}

class WeatherData(BaseModel):
    location: dict  # {lat: float, lon: float}
    timestamp: str
    wind_speed: float
    wave_height: float
    visibility: float
    current_speed: float
    current_direction: float

@app.post("/optimize/route")
async def optimize_route(data: RouteRequest):
    try:
        # Buscar dados meteorológicos
        weather = get_weather_forecast(
            data.origin,
            data.destination,
            data.departure_time
        )
        
        # Calcular rota otimizada
        route = calculate_optimal_route(
            data.origin,
            data.destination,
            weather,
            data.constraints
        )
        
        # Avaliar riscos
        risks = assess_route_risks(route, weather)
        
        return {
            "route": route,
            "estimated_duration": calculate_duration(route, weather),
            "weather_conditions": weather,
            "risks": risks,
            "fuel_consumption": estimate_fuel_consumption(route, data.vessel_type),
            "safety_score": calculate_safety_score(risks)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_weather_forecast(origin: dict, destination: dict, departure_time: str) -> List[WeatherData]:
    # Implementar integração com API de previsão do tempo
    # Retornar dados simulados por enquanto
    weather_data = []
    current_time = datetime.fromisoformat(departure_time)
    
    # Gerar pontos entre origem e destino
    lats = np.linspace(origin['lat'], destination['lat'], 10)
    lons = np.linspace(origin['lon'], destination['lon'], 10)
    
    for lat, lon in zip(lats, lons):
        weather_data.append({
            "location": {"lat": float(lat), "lon": float(lon)},
            "timestamp": current_time.isoformat(),
            "wind_speed": float(np.random.normal(15, 5)),  # nós
            "wave_height": float(np.random.normal(2, 0.5)),  # metros
            "visibility": float(np.random.normal(10, 2)),  # km
            "current_speed": float(np.random.normal(1, 0.3)),  # nós
            "current_direction": float(np.random.uniform(0, 360))  # graus
        })
    
    return weather_data

def calculate_optimal_route(
    origin: dict,
    destination: dict,
    weather: List[dict],
    constraints: dict
) -> List[dict]:
    # Implementar algoritmo de otimização de rota
    # A* ou Dijkstra considerando condições meteorológicas
    route = []
    
    # Simplificado - rota direta com waypoints
    lats = np.linspace(origin['lat'], destination['lat'], 20)
    lons = np.linspace(origin['lon'], destination['lon'], 20)
    
    for lat, lon in zip(lats, lons):
        route.append({
            "position": {"lat": float(lat), "lon": float(lon)},
            "estimated_time": None  # Será calculado depois
        })
    
    # Calcular tempos estimados
    calculate_estimated_times(route, weather)
    
    return route

def assess_route_risks(route: List[dict], weather: List[dict]) -> List[dict]:
    risks = []
    
    for point, conditions in zip(route, weather):
        risk_level = "low"
        risk_factors = []
        
        # Avaliar condições meteorológicas
        if conditions["wave_height"] > 3.0:
            risk_factors.append("high_waves")
            risk_level = "high"
        elif conditions["wave_height"] > 2.0:
            risk_factors.append("moderate_waves")
            risk_level = max(risk_level, "medium")
            
        if conditions["wind_speed"] > 25:
            risk_factors.append("strong_winds")
            risk_level = "high"
        elif conditions["wind_speed"] > 15:
            risk_factors.append("moderate_winds")
            risk_level = max(risk_level, "medium")
            
        if conditions["visibility"] < 5:
            risk_factors.append("low_visibility")
            risk_level = max(risk_level, "medium")
        
        risks.append({
            "position": point["position"],
            "level": risk_level,
            "factors": risk_factors
        })
    
    return risks

def calculate_duration(route: List[dict], weather: List[dict]) -> float:
    # Calcular duração total considerando condições
    total_hours = 0
    vessel_speed = 12  # nós
    
    for i in range(len(route) - 1):
        distance = calculate_distance(
            route[i]["position"],
            route[i + 1]["position"]
        )
        
        # Ajustar velocidade baseado no clima
        adjusted_speed = adjust_speed(
            vessel_speed,
            weather[i]["wave_height"],
            weather[i]["wind_speed"]
        )
        
        total_hours += distance / adjusted_speed
    
    return total_hours

def calculate_distance(p1: dict, p2: dict) -> float:
    # Calcular distância náutica entre pontos
    # Implementar fórmula de Haversine
    return np.sqrt((p2["lat"] - p1["lat"])**2 + (p2["lon"] - p1["lon"])**2) * 60

def adjust_speed(base_speed: float, wave_height: float, wind_speed: float) -> float:
    # Ajustar velocidade baseado nas condições
    speed = base_speed
    
    # Reduzir velocidade com ondas altas
    if wave_height > 3.0:
        speed *= 0.6
    elif wave_height > 2.0:
        speed *= 0.8
    
    # Reduzir velocidade com ventos fortes
    if wind_speed > 25:
        speed *= 0.7
    elif wind_speed > 15:
        speed *= 0.9
    
    return speed

def estimate_fuel_consumption(route: List[dict], vessel_type: str) -> float:
    # Estimar consumo de combustível
    # Implementar baseado no tipo de embarcação e distância
    base_consumption = {
        "supply": 150,  # litros por hora
        "platform": 200,
        "tanker": 300
    }
    
    total_hours = sum(
        point["estimated_time"] for point in route if point["estimated_time"]
    )
    
    return base_consumption.get(vessel_type, 200) * total_hours

def calculate_safety_score(risks: List[dict]) -> float:
    # Calcular pontuação de segurança da rota
    risk_weights = {
        "low": 1.0,
        "medium": 0.6,
        "high": 0.2
    }
    
    scores = [risk_weights[risk["level"]] for risk in risks]
    return sum(scores) / len(scores) * 100

def calculate_estimated_times(route: List[dict], weather: List[dict]) -> None:
    # Calcular tempos estimados para cada waypoint
    current_time = 0
    vessel_speed = 12  # nós
    
    for i in range(len(route)):
        if i > 0:
            distance = calculate_distance(
                route[i-1]["position"],
                route[i]["position"]
            )
            adjusted_speed = adjust_speed(
                vessel_speed,
                weather[i]["wave_height"],
                weather[i]["wind_speed"]
            )
            current_time += distance / adjusted_speed
        
        route[i]["estimated_time"] = current_time 