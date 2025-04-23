import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000'
});

export const fetchWellData = async (wellId: string) => {
  const [history, prediction] = await Promise.all([
    api.get(`/wells/${wellId}/history`),
    api.post('/predict/reserves', {
      well_id: wellId,
      seismic_attributes: [],
      production_history: []
    })
  ]);

  return {
    ...prediction.data,
    history: history.data
  };
}; 