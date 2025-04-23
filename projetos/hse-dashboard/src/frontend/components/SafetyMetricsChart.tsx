import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

interface Props {
  data: any;
}

export const SafetyMetricsChart: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: 'Taxa de Incidentes',
        data: data.incident_rate,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Nível de Risco',
        data: data.risk_level,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Métricas de Segurança
      </Typography>
      <Line data={chartData} />
    </Box>
  );
}; 