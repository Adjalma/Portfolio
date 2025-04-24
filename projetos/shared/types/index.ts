export interface WellData {
  id: string;
  well_id: string;
  timestamp: string;
  pressure: number;
  temperature: number;
  flow_rate: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface Alert {
  id: string;
  well_id: string;
  timestamp: string;
  type: 'warning' | 'critical';
  message: string;
}

export interface SeismicEvent {
  id: string;
  start_time: number;
  end_time: number;
  magnitude: number;
  location: {
    lat: number;
    lon: number;
  };
}

export interface Anomaly {
  id: string;
  start_time: number;
  end_time: number;
  type: string;
  confidence: number;
}

export interface Well {
  id: string;
  name: string;
  current_parameters: {
    pressure: number;
    temperature: number;
    flow_rate: number;
  };
}