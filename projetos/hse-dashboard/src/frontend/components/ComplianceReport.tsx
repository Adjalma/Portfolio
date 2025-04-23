import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface Props {
  data: number | null;
}

export const ComplianceReport: React.FC<Props> = ({ data }) => {
  if (data === null) return null;

  return (
    <Box p={2} display="flex" alignItems="center">
      <CircularProgress 
        variant="determinate" 
        value={data} 
        size={80}
        sx={{ mr: 2 }}
      />
      <Box>
        <Typography variant="h6">
          Índice de Conformidade
        </Typography>
        <Typography variant="h4" color={data >= 80 ? 'success.main' : 'warning.main'}>
          {data}%
        </Typography>
      </Box>
    </Box>
  );
}; 