import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Adjalma Machado
        </Typography>
        <Button color="inherit" component={Link} to="/">Projetos</Button>
        <Button color="inherit" component={Link} to="/about">Sobre</Button>
        <Button color="inherit" component={Link} to="/contact">Contato</Button>
      </Toolbar>
    </AppBar>
  );
} 