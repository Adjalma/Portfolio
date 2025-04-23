import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { WellData } from '../types';

interface Props {
  data: WellData[];
  parameter: keyof WellData;
}

export const RealTimeChart: React.FC<Props> = ({ data, parameter }) => {
  const chartData = {
    labels: data.map((_, i) => `${i}`),
    datasets: [
      {
        label: parameter,
        data: data.map(d => d[parameter]),
        borderColor: 'rgb(75, 192, 192)',
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
        text: `Monitoramento em Tempo Real - ${parameter}`
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          {parameter}
        </Typography>
        <Line data={chartData} options={options} />
      </Box>
    </Card>
  );
}; 