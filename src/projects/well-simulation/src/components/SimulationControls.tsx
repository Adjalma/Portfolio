import React from 'react';
import { Paper, Typography, Grid, TextField, Button, Slider } from '@mui/material';
import { PlayArrow, Stop, Refresh } from '@mui/icons-material';

export const SimulationControls = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Controles de Simulação
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Profundidade do Poço (m)"
            defaultValue="3000"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>Pressão de Injeção (psi)</Typography>
          <Slider
            defaultValue={2000}
            min={0}
            max={5000}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>Vazão (bbl/d)</Typography>
          <Slider
            defaultValue={1000}
            min={0}
            max={3000}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12}>
          <Button startIcon={<PlayArrow />} variant="contained" sx={{ mr: 1 }}>
            Iniciar
          </Button>
          <Button startIcon={<Stop />} variant="outlined" sx={{ mr: 1 }}>
            Parar
          </Button>
          <Button startIcon={<Refresh />} variant="outlined">
            Resetar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}; 