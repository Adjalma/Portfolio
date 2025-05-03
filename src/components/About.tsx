import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export function About() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sobre
        </Typography>
        <Typography variant="body1">
          Sou Adjalma Machado Aguiar Junior, especialista em manutenção preditiva e autor de livros técnicos.
        </Typography>
      </Box>
    </Container>
  );
} 