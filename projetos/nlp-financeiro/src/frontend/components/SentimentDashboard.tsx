import React from 'react';
import { Box, Card, Typography, CircularProgress } from '@mui/material';
import { Sentiment } from '@mui/icons-material';

interface Props {
  sentiment: {
    label: string;
    score: number;
  } | null;
}

export const SentimentDashboard: React.FC<Props> = ({ sentiment }) => {
  if (!sentiment) return null;

  const getSentimentColor = (score: number): string => {
    if (score >= 0.7) return '#4caf50';
    if (score >= 0.4) return '#ff9800';
    return '#f44336';
  };

  return (
    <Card>
      <Box p={3} display="flex" alignItems="center">
        <Sentiment sx={{ fontSize: 40, mr: 2 }} />
        <Box>
          <Typography variant="h6">
            Análise de Sentimento
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: getSentimentColor(sentiment.score) }}
          >
            {sentiment.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Confiança: {(sentiment.score * 100).toFixed(1)}%
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}; 