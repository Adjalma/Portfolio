import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000'
});

export const analyzeDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('document', file);
  const response = await api.post('/analyze', formData);
  return response.data;
}; 