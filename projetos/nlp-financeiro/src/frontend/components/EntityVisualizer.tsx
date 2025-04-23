import React from 'react';
import { Box, Chip, Typography, Paper } from '@mui/material';

interface Entity {
  text: string;
  label: string;
  start: number;
  end: number;
}

interface Props {
  entities: Entity[];
}

export const EntityVisualizer: React.FC<Props> = ({ entities }) => {
  const getEntityColor = (label: string): string => {
    switch (label) {
      case 'MONEY':
        return '#4caf50';
      case 'ORG':
        return '#2196f3';
      case 'DATE':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Entidades Identificadas
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {entities.map((entity, index) => (
            <Chip
              key={index}
              label={`${entity.text} (${entity.label})`}
              sx={{
                bgcolor: getEntityColor(entity.label),
                color: 'white'
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}; 