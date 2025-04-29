import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { time: '00:00', viscosity: 35.2, density: 0.87, waterContent: 0.5 },
  { time: '02:00', viscosity: 35.4, density: 0.88, waterContent: 0.4 },
  { time: '04:00', viscosity: 35.1, density: 0.87, waterContent: 0.6 },
];

export const OilQualityDashboard = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Qualidade do Óleo
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="viscosity" stroke="#8884d8" />
            <Line type="monotone" dataKey="density" stroke="#82ca9d" />
            <Line type="monotone" dataKey="waterContent" stroke="#ffc658" />
          </LineChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 