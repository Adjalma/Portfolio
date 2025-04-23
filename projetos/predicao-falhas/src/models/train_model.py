import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout
from sklearn.preprocessing import StandardScaler

def train_failure_model(data_path: str):
    # Carregar dados
    df = pd.read_csv(data_path)
    
    # Preparar features
    features = ['temperature', 'pressure', 'vibration', 'oil_level']
    X = df[features].values
    y = df['failure'].values
    
    # Split dados
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    # Normalizar
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    # Criar modelo
    model = Sequential([
        LSTM(64, input_shape=(X_train.shape[1], 1), return_sequences=True),
        Dropout(0.2),
        LSTM(32),
        Dense(16, activation='relu'),
        Dense(1, activation='sigmoid')
    ])
    
    # Compilar e treinar
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2)
    
    # Salvar modelo
    model.save('models/failure_prediction.h5')
    
if __name__ == "__main__":
    train_failure_model('data/sensor_data.csv') 