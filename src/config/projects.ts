import { Project } from '../types/projects';

export const projects: Project[] = [
  {
    id: 'digital-library',
    title: 'Biblioteca Digital',
    description: 'Sistema de gerenciamento de biblioteca digital com recursos de busca e categorização',
    path: '/digital-library',
    components: ['BookList', 'CategoryFilter', 'SearchBar']
  },
  {
    id: 'equipment-monitoring',
    title: 'Monitoramento de Equipamentos',
    description: 'Sistema para monitoramento em tempo real de equipamentos industriais',
    path: '/equipment-monitoring',
    components: ['EquipmentStatus', 'MaintenanceSchedule', 'PerformanceMetrics']
  },
  {
    id: 'hse-dashboard',
    title: 'HSE Dashboard',
    description: 'Dashboard para monitoramento de indicadores de saúde, segurança e meio ambiente',
    path: '/hse-dashboard',
    components: ['ComplianceStatus', 'EnvironmentalData', 'IncidentReport', 'SafetyMetrics']
  },
  {
    id: 'maintenance-predictor',
    title: 'Preditor de Manutenção',
    description: 'Sistema preditivo para manutenção de equipamentos usando machine learning',
    path: '/maintenance-predictor',
    components: ['EquipmentHealth', 'MaintenanceRecommendations', 'PredictionDashboard']
  },
  {
    id: 'monitoramento-pocos',
    title: 'Monitoramento de Poços',
    description: 'Sistema para monitoramento de poços de petróleo em tempo real',
    path: '/monitoramento-pocos',
    components: ['AlertPanel', 'DataAnalysis', 'WellMonitoring']
  },
  {
    id: 'oil-analysis',
    title: 'Análise de Óleo',
    description: 'Sistema para análise de qualidade de óleo e geração de relatórios',
    path: '/oil-analysis',
    components: ['OilQualityDashboard', 'ReportGenerator', 'TrendAnalysis']
  },
  {
    id: 'production-optimization',
    title: 'Otimização de Produção',
    description: 'Sistema para otimização de produção usando algoritmos de machine learning',
    path: '/production-optimization',
    components: ['MLPredictions', 'OptimizationSuggestions', 'ProductionDashboard']
  },
  {
    id: 'well-simulation',
    title: 'Simulação de Poços',
    description: 'Sistema para simulação de comportamento de poços de petróleo',
    path: '/well-simulation',
    components: ['ResultsAnalysis', 'SimulationControls', 'WellVisualization']
  }
]; 