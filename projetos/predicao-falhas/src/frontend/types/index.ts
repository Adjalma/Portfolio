export interface SensorData {
  equipment_id: string;
  timestamp: string;
  temperature: number;
  pressure: number;
  vibration: number;
  noise_level: number;
  power_consumption: number;
  operational_hours: number;
}

export interface Prediction {
  failure_probability: number;
  is_anomaly: boolean;
  estimated_hours_to_failure: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  recommendations: Array<{
    type: string;
    priority: string;
    description: string;
  }>;
  next_maintenance: string;
}

export interface Alert {
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
} 