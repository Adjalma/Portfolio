from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel
import spacy
import pandas as pd
import numpy as np
from transformers import pipeline
from datetime import datetime
import json

app = FastAPI(title="Análise Financeira com NLP")

# Carregar modelos
nlp = spacy.load("pt_core_news_lg")
sentiment_analyzer = pipeline("sentiment-analysis", model="financeiro-bert-pt")

class DocumentAnalysis(BaseModel):
    document_id: str
    content: str
    language: str
    type: str  # contrato, relatório, balanço

@app.post("/analyze/document")
async def analyze_document(document: DocumentAnalysis):
    try:
        # Processar documento com NLP
        doc = nlp(document.content)
        
        # Extrair entidades financeiras
        financial_entities = extract_financial_entities(doc)
        
        # Análise de sentimento
        sentiment = analyze_sentiment(document.content)
        
        # Gerar resumo
        summary = generate_summary(doc)
        
        return {
            "document_id": document.document_id,
            "entities": financial_entities,
            "sentiment": sentiment,
            "summary": summary,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def extract_financial_entities(doc):
    entities = []
    for ent in doc.ents:
        if ent.label_ in ["MONEY", "ORG", "DATE"]:
            entities.append({
                "text": ent.text,
                "label": ent.label_,
                "start": ent.start_char,
                "end": ent.end_char
            })
    return entities

def analyze_sentiment(text):
    result = sentiment_analyzer(text)[0]
    return {
        "label": result["label"],
        "score": float(result["score"])
    }

def generate_summary(doc):
    # Implementar lógica de sumarização
    # Usando algoritmos de ranking de sentenças
    pass 