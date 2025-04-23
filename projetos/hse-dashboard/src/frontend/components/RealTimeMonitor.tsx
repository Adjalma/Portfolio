import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface RealTimeData {
  timestamp: string;
  value: number;
  type: string;
}

export const RealTimeMonitor: React.FC = () => {
  const [data, setData] = useState<RealTimeData[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(prev => [...prev, newData].slice(-50)); // Keep last 50 points
    };

    return () => ws.close();
  }, []);

  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Monitoramento em Tempo Real',
        data: data.map(d => d.value),
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
        text: 'Dados em Tempo Real'
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
          Monitoramento em Tempo Real
        </Typography>
        <Line data={chartData} options={options} />
      </Box>
    </Card>
  );
}; 