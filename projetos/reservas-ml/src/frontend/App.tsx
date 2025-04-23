import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { ReservoirModel } from './components/ReservoirModel';
import { ProductionHistory } from './components/ProductionHistory';
import { SeismicVisualizer } from './components/SeismicVisualizer';
import { PredictionDashboard } from './components/PredictionDashboard';
import { api } from './services/api';

interface WellData {
  well_id: string;
  predicted_volume: number;
  confidence: number;
  history: {
    seismic: number[];
    production: Array<{
      timestamp: string;
      production: number;
    }>;
  };
}

export const App: React.FC = () => {
  const [selectedWell, setSelectedWell] = useState<string>('');
  const [wellData, setWellData] = useState<WellData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedWell) {
      loadWellData(selectedWell);
    }
  }, [selectedWell]);

  const loadWellData = async (wellId: string) => {
    setLoading(true);
    try {
      const history = await api.get(`/wells/${wellId}/history`);
      const prediction = await api.post('/predict/reserves', {
        well_id: wellId,
        seismic_attributes: history.data.seismic,
        production_history: history.data.production
      });

      setWellData({
        ...prediction.data,
        history: history.data
      });
    } catch (error) {
      console.error('Error loading well data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} component="main">
      <Grid item xs={12} component="section">
        <Typography variant="h4">Modelagem de Reservatórios</Typography>
      </Grid>

      <Grid item xs={12} md={8} component="section">
        <Card>
          <SeismicVisualizer data={wellData?.history?.seismic || []} />
        </Card>
      </Grid>

      <Grid item xs={12} md={4} component="section">
        <PredictionDashboard 
          predictedVolume={wellData?.predicted_volume || null}
          confidence={wellData?.confidence || null}
        />
      </Grid>

      <Grid item xs={12} component="section">
        <ProductionHistory data={wellData?.history?.production || []} />
      </Grid>

      <Grid item xs={12} component="section">
        <ReservoirModel wellId={selectedWell} />
      </Grid>
    </Grid>
  );
}; 