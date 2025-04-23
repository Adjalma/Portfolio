export interface WellData {
  id: string;
  timestamp: number;
  pressure: number;
  temperature: number;
  flow_rate: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface Alert {
  id: string;
  well_id: string;
  type: 'pressure' | 'temperature' | 'flow';
  severity: 'warning' | 'critical';
  message: string;
  timestamp: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
}

export interface WellStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: number;
  metrics: {
    pressure: number;
    temperature: number;
    flow_rate: number;
  };
}