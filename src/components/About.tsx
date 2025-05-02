import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

export const About = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sobre Mim
      </Typography>
      <Typography paragraph>
        Sou um desenvolvedor full-stack especializado em soluções para a indústria de óleo e gás.
        Com experiência em React, TypeScript, Python e análise de dados.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Habilidades
        </Typography>
        <Typography>
          • Frontend: React, TypeScript, Material-UI<br />
          • Backend: Node.js, Python, FastAPI<br />
          • Dados: Pandas, NumPy, Scikit-learn<br />
          • DevOps: Docker, Git, CI/CD
        </Typography>
      </Box>
    </Paper>
  );
};
