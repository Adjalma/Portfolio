import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
});

export const fetchWells = async () => {
  const response = await api.get('/wells');
  return response.data;
};

export const optimizeParameters = async (wellId: string, params: any) => {
  const response = await api.post(`/wells/${wellId}/optimize`, params);
  return response.data;
};

export const getProductionHistory = async (wellId: string) => {
  const response = await api.get(`/wells/${wellId}/production`);
  return response.data;
}; 