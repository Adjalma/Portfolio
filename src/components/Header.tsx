import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Meu Portfólio
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Projetos
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            Sobre
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Contato
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 