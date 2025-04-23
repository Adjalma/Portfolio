import axios from 'axios';

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

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
});

export const fetchWeatherData = async (): Promise<WeatherData> => {
  const response = await api.get<WeatherData>('/weather');
  return response.data;
};

export const startVesselTracking = async (): Promise<VesselData[]> => {
  const response = await api.get<VesselData[]>('/vessels/tracking');
  return response.data;
};

export const getWeatherColor = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'severe':
      return '#ff4444';
    case 'moderate':
      return '#ffbb33';
    case 'good':
      return '#00C851';
    default:
      return '#33b5e5';
  }
};

export { api };