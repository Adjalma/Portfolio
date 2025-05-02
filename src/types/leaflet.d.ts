import { LatLngExpression } from 'leaflet';

declare module 'react-leaflet' {
  interface MapContainerProps {
    center: LatLngExpression;
    zoom: number;
    children?: React.ReactNode;
  }

  interface CircleProps {
    center: LatLngExpression;
    radius: number;
    color?: string;
    children?: React.ReactNode;
  }

  interface PolylineProps {
    positions: LatLngExpression[];
    color?: string;
    children?: React.ReactNode;
  }
} 