import React from 'react';
import { Box, Card, Typography, CircularProgress } from '@mui/material';

interface MaintenancePrediction {
  equipment_id: string;
  risk_score: number;
  next_maintenance: {
    hours_remaining: number;
    estimated_date: string;
  };
}

interface Props {
  prediction: MaintenancePrediction | null;
}

export const RiskAnalysis: React.FC<Props> = ({ prediction }) => {
  if (!prediction) return null;

  const getRiskColor = (score: number): string => {
    if (score >= 0.7) return '#f44336';
    if (score >= 0.4) return '#ff9800';
    return '#4caf50';
  };

  return (
    <Card>
      <Box p={3} display="flex" alignItems="center">
        <CircularProgress
          variant="determinate"
          value={prediction.risk_score * 100}
          size={80}
          sx={{
            color: getRiskColor(prediction.risk_score),
            mr: 3
          }}
        />
        <Box>
          <Typography variant="h6">
            Análise de Risco
          </Typography>
          <Typography variant="h4" sx={{ color: getRiskColor(prediction.risk_score) }}>
            {(prediction.risk_score * 100).toFixed(1)}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Próxima manutenção em: {prediction.next_maintenance.hours_remaining} horas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data estimada: {new Date(prediction.next_maintenance.estimated_date).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}; 