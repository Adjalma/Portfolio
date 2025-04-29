import React from 'react';
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

const categories = [
  'Engenharia',
  'Processamento',
  'Geologia',
  'Perfuração',
  'Produção',
  'Reservatórios'
];

export const CategoryFilter = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Categorias
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem button key={category}>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 