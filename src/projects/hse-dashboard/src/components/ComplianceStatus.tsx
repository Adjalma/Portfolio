import React from 'react';
import { Paper, Typography, Grid, Card, CardContent, LinearProgress } from '@mui/material';

const complianceData = [
  {
    category: 'Segurança Ocupacional',
    compliance: 85,
    lastAudit: '2024-03-15',
    status: 'Em conformidade'
  },
  {
    category: 'Gestão Ambiental',
    compliance: 92,
    lastAudit: '2024-03-10',
    status: 'Em conformidade'
  },
  {
    category: 'Procedimentos de Emergência',
    compliance: 78,
    lastAudit: '2024-03-05',
    status: 'Requer atenção'
  }
];

export const ComplianceStatus = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Status de Conformidade
      </Typography>
      <Grid container spacing={2}>
        {complianceData.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.category}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  Última Auditoria: {item.lastAudit}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Status: {item.status}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={item.compliance}
                  color={
                    item.compliance >= 90 ? 'success' :
                    item.compliance >= 80 ? 'warning' : 'error'
                  }
                  sx={{ mt: 1 }}
                />
                <Typography variant="body2" align="right">
                  {item.compliance}% conforme
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}; 