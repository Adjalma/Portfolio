import React from 'react';
import { Box, Card, Typography, CircularProgress } from '@mui/material';

interface Props {
  predictedVolume: number | null;
  confidence: number | null;
}

export const PredictionDashboard: React.FC<Props> = ({ predictedVolume, confidence }) => {
  if (!predictedVolume || !confidence) return null;

  const confidenceColor = confidence >= 0.7 ? 'success.main' : 
                         confidence >= 0.5 ? 'warning.main' : 'error.main';

  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Previsão de Volume
        </Typography>
        
        <Box display="flex" alignItems="center" mb={2}>
          <CircularProgress 
            variant="determinate" 
            value={confidence * 100} 
            size={80}
            sx={{ mr: 2 }}
          />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Confiança
            </Typography>
            <Typography variant="h4" color={confidenceColor}>
              {(confidence * 100).toFixed(1)}%
            </Typography>
          </Box>
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Volume Previsto
          </Typography>
          <Typography variant="h4">
            {predictedVolume.toLocaleString()} bbl
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}; 