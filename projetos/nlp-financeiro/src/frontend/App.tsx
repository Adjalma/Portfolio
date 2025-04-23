import React, { useState } from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';
import { DocumentUploader } from './components/DocumentUploader';
import { AnalysisResults } from './components/AnalysisResults';
import { EntityVisualizer } from './components/EntityVisualizer';
import { SentimentDashboard } from './components/SentimentDashboard';
import { api } from './services/api';

interface AnalysisResult {
  document_id: string;
  entities: Array<{
    text: string;
    label: string;
    start: number;
    end: number;
  }>;
  sentiment: {
    label: string;
    score: number;
  };
  summary: string;
  timestamp: string;
}

export const App: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDocumentUpload = async (file: File) => {
    setLoading(true);
    try {
      const content = await file.text();
      const response = await api.post('/analyze/document', {
        document_id: file.name,
        content,
        language: 'pt',
        type: 'report'
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} component="main">
      <Grid item xs={12} component="header">
        <Typography variant="h4">
          Análise de Documentos Financeiros
        </Typography>
      </Grid>

      <Grid item xs={12} md={4} component="section">
        <DocumentUploader onUpload={handleDocumentUpload} loading={loading} />
      </Grid>

      <Grid item xs={12} md={8} component="section">
        <Card>
          <Box p={2}>
            <EntityVisualizer entities={result?.entities || []} />
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} component="section">
        <SentimentDashboard sentiment={result?.sentiment} />
      </Grid>

      <Grid item xs={12} component="section">
        <AnalysisResults result={result} />
      </Grid>
    </Grid>
  );
}; 