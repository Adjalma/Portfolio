FROM python:3.9-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Baixar modelos do spaCy e NLTK
RUN python -m spacy download pt_core_news_sm
RUN python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"

COPY src/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 