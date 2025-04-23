import React from 'react';
import { Circle, Tooltip } from 'react-leaflet';
import { getWeatherColor } from '../services/api';

interface WeatherPoint {
  lat: number;
  lon: number;
  wind_speed: number;
  wave_height: number;
  visibility: number;
  condition: string;
}

interface Props {
  data: WeatherPoint[];
}

export const WeatherOverlay: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.map((point, index) => (
        <Circle
          key={index}
          center={[point.lat, point.lon]}
          radius={5000}
          color={getWeatherColor(point.condition)}
        >
          <Tooltip>
            Vento: {point.wind_speed} nós<br/>
            Ondas: {point.wave_height}m<br/>
            Visibilidade: {point.visibility}km
          </Tooltip>
        </Circle>
      ))}
    </>
  );
}; 