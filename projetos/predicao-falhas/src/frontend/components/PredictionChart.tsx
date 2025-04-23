import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Prediction } from '../types';

interface Props {
  data: Prediction[];
}

export const PredictionChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((_, i) => `Ponto ${i + 1}`),
    datasets: [
      {
        label: 'Probabilidade de Falha',
        data: data.map(d => d.failure_probability * 100),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Horas Estimadas até Falha',
        data: data.map(d => d.estimated_hours_to_failure),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Predição de Falhas'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Análise de Tendências
      </Typography>
      <Line data={chartData} options={options} />
    </Box>
  );
}; 