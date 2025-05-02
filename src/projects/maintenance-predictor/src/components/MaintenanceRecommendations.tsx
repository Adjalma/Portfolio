import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Chip, Box } from '@mui/material';
import { Build, Warning, Timeline, CheckCircle } from '@mui/icons-material';

const recommendations = [
  {
    id: 1,
    equipment: 'MOTOR-002',
    action: 'Substituir rolamentos',
    priority: 'high',
    impact: 'Prevenir falha catastrófica',
    confidence: 92,
    method: 'Random Forest'
  },
  {
    id: 2,
    equipment: 'VALVE-003',
    action: 'Calibrar sensores',
    priority: 'medium',
    impact: 'Melhorar precisão',
    confidence: 85,
    method: 'Neural Network'
  },
  {
    id: 3,
    equipment: 'PUMP-001',
    action: 'Inspeção visual',
    priority: 'low',
    impact: 'Manutenção preventiva',
    confidence: 78,
    method: 'Logistic Regression'
  }
];

export const MaintenanceRecommendations = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recomendações de Manutenção
      </Typography>
      <List>
        {recommendations.map((rec) => (
          <ListItem key={rec.id}>
            <ListItemIcon>
              {rec.priority === 'high' ? <Warning color="error" /> :
               rec.priority === 'medium' ? <Timeline color="warning" /> :
               <CheckCircle color="success" />}
            </ListItemIcon>
            <ListItemText
              primary={`${rec.equipment} - ${rec.action}`}
              secondary={
                <Box>
                  <Typography variant="body2">{rec.impact}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Método: {rec.method} | Confiança: {rec.confidence}%
                  </Typography>
                </Box>
              }
            />
            <Chip
              icon={<Build />}
              label={rec.priority.toUpperCase()}
              color={
                rec.priority === 'high' ? 'error' :
                rec.priority === 'medium' ? 'warning' : 'success'
              }
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 