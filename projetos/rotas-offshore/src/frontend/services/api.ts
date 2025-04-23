import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const fetchWeatherData = async () => {
  const response = await api.get('/weather');
  return response.data;
};

export const startVesselTracking = async () => {
  const response = await api.get('/vessels/track');
  return response.data;
}; 