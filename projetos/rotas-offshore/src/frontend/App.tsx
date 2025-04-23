import React, { useEffect, useState } from 'react';
import { Grid, Card } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import { WeatherOverlay } from './components/WeatherOverlay';
import { RouteForm } from './components/RouteForm';
import { WeatherInfo } from './components/WeatherInfo';
import { VesselList } from './components/VesselList';
import { api, fetchWeatherData, startVesselTracking } from './services/api';

interface WeatherPoint {
  lat: number;
  lon: number;
  wind_speed: number;
  wave_height: number;
  visibility: number;
  condition: string;
}

interface WeatherData {
  points: WeatherPoint[];
}

interface VesselData {
  id: string;
  name: string;
  position: {
    lat: number;
    lon: number;
  };
  status: 'active' | 'inactive';
}

export const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [vessels, setVessels] = useState<VesselData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const weatherData = await fetchWeatherData();
        const vesselData = await startVesselTracking();
        setWeather(weatherData);
        setVessels(vesselData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  const optimizeRoute = async (params: any) => {
    try {
      const response = await api.post('/routes/optimize', params);
      // Handle response
    } catch (error) {
      console.error('Error optimizing route:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} component="div">
        <MapContainer center={[-23.0, -43.0]} zoom={10}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {weather && <WeatherOverlay data={weather.points} />}
        </MapContainer>
      </Grid>
      
      <Grid item xs={12} md={4} component="div">
        <Card>
          <RouteForm onSubmit={optimizeRoute} />
          {weather && <WeatherInfo data={weather.points[0]} />}
          <VesselList vessels={vessels} />
        </Card>
      </Grid>
    </Grid>
  );
};