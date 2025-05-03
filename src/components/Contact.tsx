import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export function Contact() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contato
        </Typography>
        <Typography variant="body1">
          Email: contato@adjalmamachado.com.br
        </Typography>
      </Box>
    </Container>
  );
} 