import React from 'react';
import { Paper, Typography, Link, Box } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

export const Contact = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Contato
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Link 
          href="mailto:seu.email@exemplo.com"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Email /> seu.email@exemplo.com
        </Link>
        <Link 
          href="https://github.com/seu-usuario"
          target="_blank"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <GitHub /> GitHub
        </Link>
        <Link 
          href="https://linkedin.com/in/seu-perfil"
          target="_blank"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <LinkedIn /> LinkedIn
        </Link>
      </Box>
    </Paper>
  );
}; 