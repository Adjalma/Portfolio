import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Vessel } from '../types';

interface Props {
  vessels: Vessel[];
}

export const VesselTracker: React.FC<Props> = ({ vessels }) => {
  return (
    <>
      {vessels.map(vessel => (
        <Marker 
          key={vessel.id}
          position={[vessel.position.lat, vessel.position.lon]}
        >
          <Popup>
            <div>
              <h3>{vessel.name}</h3>
              <p>Status: {vessel.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}; 