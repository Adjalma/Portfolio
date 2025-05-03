import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';

// Componentes
import { Header } from './components/Header';
import { ProjectList } from './components/ProjectList';
import { About } from './components/About';
import { Contact } from './components/Contact';

// Projetos
import { MonitoramentoPocosApp } from './projects/monitoramento-pocos/src/App';
import { OilAnalysisApp } from './projects/oil-analysis/src/App';
import { HSEDashboardApp } from './projects/hse-dashboard/src/App';
import { ProductionOptimizationApp } from './projects/production-optimization/src/App';
import { EquipmentMonitoringApp } from './projects/equipment-monitoring/src/App';
import { DigitalLibraryApp } from './projects/digital-library/src/App';
import { WellSimulationApp } from './projects/well-simulation/src/App';
import { MaintenancePredictorApp } from './projects/maintenance-predictor/src/App';

import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Container component="main" sx={{ flex: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<ProjectList />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/monitoramento-pocos/*" element={<MonitoramentoPocosApp />} />
              <Route path="/oil-analysis/*" element={<OilAnalysisApp />} />
              <Route path="/hse-dashboard/*" element={<HSEDashboardApp />} />
              <Route path="/production-optimization/*" element={<ProductionOptimizationApp />} />
              <Route path="/equipment-monitoring/*" element={<EquipmentMonitoringApp />} />
              <Route path="/digital-library/*" element={<DigitalLibraryApp />} />
              <Route path="/well-simulation/*" element={<WellSimulationApp />} />
              <Route path="/maintenance-predictor/*" element={<MaintenancePredictorApp />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;