import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';
import { WellData } from '../types';
import { RealTimeChart } from './RealTimeChart';

interface Props {
  data: WellData[];
}

export const ParametersDashboard: React.FC<Props> = ({ data }) => {
  const parameters: (keyof WellData)[] = ['pressure', 'temperature', 'flow_rate'];

  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Parâmetros do Poço
        </Typography>
        
        <Grid container spacing={2}>
          {parameters.map(param => (
            <Grid key={param} item xs={12} md={4}>
              <RealTimeChart data={data} parameter={param} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}; 