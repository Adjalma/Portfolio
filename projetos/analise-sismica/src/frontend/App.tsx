import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { SeismicChart } from './components/SeismicChart';
import { EventList } from './components/EventList';
import { AnomalyMap } from './components/AnomalyMap';
import { AnalysisControls } from './components/AnalysisControls';
import { api } from './services/api';

interface SeismicEvent {
  start_time: number;
  end_time: number;
  magnitude: number;
  classification: string;
}

interface Anomaly {
  start_sample: number;
  end_sample: number;
  severity: number;
}

interface AnalysisResult {
  location: {
    lat: number;
    lon: number;
  };
  timestamp: string;
  events: SeismicEvent[];
  anomalies: Anomaly[];
  analysis_timestamp: string;
}

export const App: React.FC = () => {
  const [seismicData, setSeismicData] = useState<number[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDataUpload = async (file: File) => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Float32Array(e.target?.result as ArrayBuffer);
        setSeismicData(Array.from(data));
        
        const response = await api.post('/analyze/seismic', {
          location: { lat: -23.5505, lon: -46.6333 }, // São Paulo
          timestamp: new Date().toISOString(),
          depth: 1000,
          data: Array.from(data),
          sampling_rate: 100
        });
        
        setAnalysisResult(response.data);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error analyzing seismic data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} component="main">
      <Grid item xs={12} component="header">
        <Typography variant="h4">
          Análise de Dados Sísmicos
        </Typography>
      </Grid>

      <Grid item xs={12} component="section">
        <AnalysisControls onUpload={handleDataUpload} loading={loading} />
      </Grid>

      <Grid item xs={12} md={8} component="section">
        <SeismicChart
          data={seismicData}
          events={analysisResult?.events || []}
          anomalies={analysisResult?.anomalies || []}
        />
      </Grid>

      <Grid item xs={12} md={4} component="section">
        <EventList events={analysisResult?.events || []} />
      </Grid>

      <Grid item xs={12} component="section">
        <AnomalyMap
          location={analysisResult?.location}
          anomalies={analysisResult?.anomalies || []}
        />
      </Grid>
    </Grid>
  );
}; 