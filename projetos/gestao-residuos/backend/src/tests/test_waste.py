import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_analyze_waste():
    waste_data = {
        "facility_id": "FAC-001",
        "timestamp": "2024-03-20T14:30:00",
        "waste_type": "liquid",
        "parameters": {
            "ph": 7.2,
            "conductivity": 1500,
            "turbidity": 45
        },
        "volume": 1000,
        "treatment_method": "chemical"
    }
    
    response = client.post("/analyze/waste", json=waste_data)
    assert response.status_code == 200
    data = response.json()
    
    assert "treatment_recommendations" in data
    assert "compliance_status" in data
    assert "next_inspection" in data

def test_treatment_optimization():
    optimization_request = {
        "waste_type": "liquid",
        "parameters": {
            "ph": 7.2,
            "conductivity": 1500,
            "turbidity": 45
        },
        "volume": 1000
    }
    
    response = client.post("/optimize/treatment", json=optimization_request)
    assert response.status_code == 200
    data = response.json()
    
    assert "recommended_method" in data
    assert "expected_efficiency" in data 