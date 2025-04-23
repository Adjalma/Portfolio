import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def build_model(input_shape):
    model = Sequential([
        LSTM(128, input_shape=input_shape, return_sequences=True),
        Dropout(0.2),
        LSTM(64, return_sequences=False),
        Dense(32, activation='relu'),
        Dense(2, activation='linear')  # [volume, confidence]
    ])
    
    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='mse',
        metrics=['mae']
    )
    
    return model

def prepare_data(data_path):
    df = pd.read_csv(data_path)
    
    # Preparar features
    seismic = df['seismic_attributes'].values
    production = df['production_history'].values
    X = np.column_stack([seismic, production])
    
    # Target
    y = df['reservoir_volume'].values
    
    return train_test_split(X, y, test_size=0.2)

def train_reservoir_model(data_path):
    X_train, X_test, y_train, y_test = prepare_data(data_path)
    
    # Normalizar dados
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    # Reshape para LSTM
    X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
    X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)
    
    # Treinar modelo
    model = build_model((X_train.shape[1], 1))
    model.fit(
        X_train, y_train,
        epochs=50,
        batch_size=32,
        validation_split=0.2
    )
    
    # Salvar modelo
    model.save('models/reservoir_lstm.h5')

if __name__ == "__main__":
    train_reservoir_model('data/reservoir_data.csv') 