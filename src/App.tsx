import React from 'react';
import { Grid, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">
          Portfolio - Adjalma
        </Typography>
      </Grid>
    </Grid>
  );
};

export default App; 