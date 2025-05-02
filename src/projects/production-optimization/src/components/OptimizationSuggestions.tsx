import React from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { TrendingUp, Warning, CheckCircle } from '@mui/icons-material';

const suggestions = [
  {
    id: 1,
    type: 'improvement',
    message: 'Aumentar pressão no poço A-123',
    impact: 'Potencial aumento de 15% na produção'
  },
  {
    id: 2,
    type: 'warning',
    message: 'Reduzir vazão no poço B-456',
    impact: 'Evitar queda de produção de 10%'
  },
  {
    id: 3,
    type: 'success',
    message: 'Otimização concluída no poço C-789',
    impact: 'Aumento de 20% na produção'
  }
];

export const OptimizationSuggestions = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Sugestões de Otimização
      </Typography>
      <List>
        {suggestions.map((suggestion) => (
          <ListItem key={suggestion.id}>
            <ListItemIcon>
              {suggestion.type === 'improvement' && <TrendingUp color="primary" />}
              {suggestion.type === 'warning' && <Warning color="warning" />}
              {suggestion.type === 'success' && <CheckCircle color="success" />}
            </ListItemIcon>
            <ListItemText 
              primary={suggestion.message}
              secondary={suggestion.impact}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 