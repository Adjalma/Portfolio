import React from 'react';
import { Circle, Tooltip } from 'react-leaflet';

export const WeatherOverlay: React.FC<{data: any}> = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {data.map((point: any, index: number) => (
        <Circle
          key={index}
          center={[point.lat, point.lon]}
          radius={5000}
          color={getWeatherColor(point.condition)}
        >
          <Tooltip>
            Vento: {point.wind_speed} nós<br/>
            Ondas: {point.wave_height}m
          </Tooltip>
        </Circle>
      ))}
    </>
  );
}; 