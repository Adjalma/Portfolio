import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Dias sem acidentes', value: 365 },
  { name: 'Incidentes reportados', value: 12 },
  { name: 'Quase acidentes', value: 24 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export const SafetyMetrics = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Métricas de Segurança
      </Typography>
      <Box sx={{ height: 300 }}>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx={200}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>
    </Paper>
  );
}; 