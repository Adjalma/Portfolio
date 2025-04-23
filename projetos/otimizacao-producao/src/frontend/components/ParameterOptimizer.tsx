import React from 'react';
import { Card, Typography, Grid, TextField, Button } from '@mui/material';

interface Props {
  well?: {
    id: string;
    name: string;
    current_parameters: {
      pressure: number;
      temperature: number;
      flow_rate: number;
    };
  };
  onOptimize: (params: any) => void;
}

export const ParameterOptimizer: React.FC<Props> = ({ well, onOptimize }) => {
  if (!well) return null;

  return (
    <Card>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Otimização de Parâmetros</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Pressão"
            defaultValue={well.current_parameters.pressure}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => onOptimize(well.id)}
          >
            Otimizar
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}; 