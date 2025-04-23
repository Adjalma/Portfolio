import React from 'react';
import { Box, Card, Typography, Divider } from '@mui/material';

interface AnalysisResult {
  document_id: string;
  summary: string;
  timestamp: string;
}

interface Props {
  result: AnalysisResult | null;
}

export const AnalysisResults: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  return (
    <Card>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Resumo da Análise
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" paragraph>
          {result.summary}
        </Typography>
        <Box mt={2}>
          <Typography variant="caption" color="text.secondary">
            Documento: {result.document_id}
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            Análise realizada em: {new Date(result.timestamp).toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}; 