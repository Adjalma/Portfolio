import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Alert, Button, Card, Grid } from '@mui/material';
import { RouteOptimizer } from './components/RouteOptimizer';
import { WeatherOverlay } from './components/WeatherOverlay';
import { VesselTracker } from './components/VesselTracker';
import { api } from './services/api';

interface Route {
  points: Array<{lat: number, lon: number}>;
  eta: string;
  fuelConsumption: number;
}

export const App: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [vessels, setVessels] = useState<any[]>([]);

  useEffect(() => {
    // Carregar dados meteorológicos
    fetchWeatherData();
    // Iniciar tracking de embarcações
    startVesselTracking();
  }, []);

  const optimizeRoute = async (params: any) => {
    try {
      const response = await api.post('/optimize/route', params);
      setRoutes([...routes, response.data]);
    } catch (error) {
      console.error('Erro ao otimizar rota:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <MapContainer center={[-23.0, -43.0]} zoom={10}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <WeatherOverlay data={weather} />
          <VesselTracker vessels={vessels} />
          {routes.map((route, index) => (
            <RouteOptimizer key={index} route={route} />
          ))}
        </MapContainer>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card>
          <RouteForm onSubmit={optimizeRoute} />
          <WeatherInfo data={weather} />
          <VesselList vessels={vessels} />
        </Card>
      </Grid>
    </Grid>
  );
}; 