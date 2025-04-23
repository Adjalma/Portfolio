import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_optimize_parameters():
    well_data = {
        "well_id": "WELL-001",
        "current_parameters": {
            "pressure": 2000,
            "flow_rate": 1000,
            "temperature": 80
        },
        "constraints": {
            "max_pressure": 2500,
            "max_temperature": 90
        }
    }
    response = client.post("/optimize", json=well_data)
    assert response.status_code == 200
    data = response.json()
    assert "optimal_parameters" in data
    assert "expected_production" in data

def test_production_forecast():
    forecast_request = {
        "well_id": "WELL-001",
        "parameters": {
            "pressure": 2200,
            "flow_rate": 1200,
            "temperature": 85
        },
        "horizon": 24  # horas
    }
    response = client.post("/forecast", json=forecast_request)
    assert response.status_code == 200
    data = response.json()
    assert "forecast" in data
    assert len(data["forecast"]) == 24 