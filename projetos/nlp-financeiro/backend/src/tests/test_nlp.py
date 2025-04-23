import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_analyze_text():
    text = """
    A empresa reportou lucro líquido de R$ 1,2 bilhão no terceiro trimestre,
    um aumento de 15% em relação ao mesmo período do ano anterior.
    """
    
    response = client.post("/analyze", json={"text": text})
    assert response.status_code == 200
    data = response.json()
    
    assert "entities" in data
    assert "sentiment" in data
    assert isinstance(data["entities"], list)
    assert isinstance(data["sentiment"], dict)

def test_extract_metrics():
    text = "Receita: R$ 5,3 bilhões; EBITDA: R$ 1,1 bilhão"
    
    response = client.post("/extract_metrics", json={"text": text})
    assert response.status_code == 200
    data = response.json()
    
    assert "metrics" in data
    assert len(data["metrics"]) > 0
    assert "value" in data["metrics"][0]

def test_sentiment_analysis():
    texts = [
        "Resultados excelentes superaram as expectativas",
        "Prejuízo significativo impactou negativamente"
    ]
    
    for text in texts:
        response = client.post("/sentiment", json={"text": text})
        assert response.status_code == 200
        data = response.json()
        
        assert "label" in data
        assert "score" in data
        assert isinstance(data["score"], float)
        assert 0 <= data["score"] <= 1 