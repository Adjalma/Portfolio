import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Card } from '@mui/material';
import { SeismicEvent } from '../types';

interface Props {
  data: number[];
  events: SeismicEvent[];
}

export const SeismicChart: React.FC<Props> = ({ data, events }) => {
  const chartData = {
    labels: data.map((_, i) => i.toString()),
    datasets: [
      {
        label: 'Amplitude',
        data: data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Card>
      <Box p={2}>
        <Line data={chartData} />
      </Box>
    </Card>
  );
};