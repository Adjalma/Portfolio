import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_get_metrics():
    response = client.get("/metrics")
    assert response.status_code == 200
    data = response.json()
    assert "incidents" in data
    assert "compliance_score" in data

def test_get_alerts():
    response = client.get("/alerts")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_create_incident():
    incident_data = {
        "type": "near_miss",
        "description": "Test incident",
        "location": "Area A",
        "severity": "low"
    }
    response = client.post("/incidents", json=incident_data)
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == incident_data["type"] 