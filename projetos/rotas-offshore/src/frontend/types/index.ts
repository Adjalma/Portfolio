export interface Route {
  points: Array<{
    lat: number;
    lon: number;
    priority?: number;
  }>;
  eta: string;
  fuelConsumption: number;
}

export interface WeatherCondition {
  wind_speed: number;
  wave_height: number;
  visibility: number;
  condition: 'good' | 'moderate' | 'severe';
}

export interface Vessel {
  id: string;
  name: string;
  position: {
    lat: number;
    lon: number;
  };
  status: 'active' | 'docked' | 'maintenance';
} 