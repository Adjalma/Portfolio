import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { time: '00:00', pressure: 2000, temperature: 80, flowRate: 100 },
  { time: '01:00', pressure: 2100, temperature: 82, flowRate: 105 },
  { time: '02:00', pressure: 2050, temperature: 81, flowRate: 102 },
  // ... mais dados
];

export const WellMonitoring = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Dados em Tempo Real
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pressure" stroke="#8884d8" />
            <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
            <Line type="monotone" dataKey="flowRate" stroke="#ffc658" />
          </LineChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 