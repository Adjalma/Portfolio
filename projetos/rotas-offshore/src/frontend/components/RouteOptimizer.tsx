import React from 'react';
import { Polyline, Marker } from 'react-leaflet';
import { Route } from '../types';

interface Props {
  route: Route;
}

export const RouteOptimizer: React.FC<Props> = ({ route }) => {
  return (
    <>
      <Polyline 
        positions={route.points.map(p => [p.lat, p.lon])}
        color="blue"
      />
      {route.points.map((point, index) => (
        <Marker 
          key={index}
          position={[point.lat, point.lon]}
        />
      ))}
    </>
  );
}; 