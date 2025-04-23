import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { WellSelector } from './components/WellSelector';
import { ParameterOptimizer } from './components/ParameterOptimizer';
import { ProductionChart } from './components/ProductionChart';
import { RecommendationList } from './components/RecommendationList';
import { api } from './services/api';

interface OptimizationResult {
  well_id: string;
  optimal_parameters: Record<string, number>;
  predicted_production: number;
  improvement_percentage: number;
  recommendations: Array<{
    parameter: string;
    current_value: number;
    recommended_value: number;
    change_percentage: number;
  }>;
}

interface WellData {
  id: string;
  name: string;
  current_parameters: Record<string, number>;
  production_history: Array<{
    timestamp: string;
    production: number;
  }>;
  constraints: Record<string, {
    min: number;
    max: number;
  }>;
}

export const App: React.FC = () => {
  const [wells, setWells] = useState<WellData[]>([]);
  const [selectedWell, setSelectedWell] = useState<string | null>(null);
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWells();
  }, []);

  const loadWells = async () => {
    try {
      const response = await api.get('/wells');
      setWells(response.data);
    } catch (error) {
      console.error('Error loading wells:', error);
    }
  };

  const handleOptimize = async (wellId: string, parameters: Record<string, number>) => {
    setLoading(true);
    try {
      const well = wells.find(w => w.id === wellId);
      if (!well) return;

      const response = await api.post('/optimize/production', {
        well_id: wellId,
        current_parameters: parameters,
        production_history: well.production_history,
        constraints: well.constraints
      });

      setOptimization(response.data);
    } catch (error) {
      console.error('Error optimizing production:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} component="main">
      <Grid item xs={12} component="header">
        <Typography variant="h4">
          Otimização de Produção
        </Typography>
      </Grid>

      <Grid item xs={12} md={4} component="section">
        <WellSelector
          wells={wells}
          selectedId={selectedWell}
          onSelect={setSelectedWell}
        />
      </Grid>

      <Grid item xs={12} md={8} component="section">
        <ParameterOptimizer
          well={wells.find(w => w.id === selectedWell)}
          onOptimize={handleOptimize}
          loading={loading}
        />
      </Grid>

      <Grid item xs={12} component="section">
        <ProductionChart
          history={wells.find(w => w.id === selectedWell)?.production_history || []}
          predicted={optimization?.predicted_production}
        />
      </Grid>

      <Grid item xs={12} component="section">
        <RecommendationList recommendations={optimization?.recommendations || []} />
      </Grid>
    </Grid>
  );
}; 