import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const productionData = [
  { day: '01/03', production: 1000, target: 1200, efficiency: 83 },
  { day: '02/03', production: 1100, target: 1200, efficiency: 92 },
  { day: '03/03', production: 1150, target: 1200, efficiency: 96 },
];

export const ProductionDashboard = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Dashboard de Produção
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart width={800} height={400} data={productionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="production" stroke="#8884d8" />
            <Line type="monotone" dataKey="target" stroke="#82ca9d" />
            <Line type="monotone" dataKey="efficiency" stroke="#ffc658" />
          </LineChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 