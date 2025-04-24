import React from 'react';
import { createSvgIcon } from '@mui/material/utils';

export const OilIcon = createSvgIcon(
  <React.Fragment>
    <path d="M20 13.5v-2l-1.2-1.6c-.8-1.1-1.3-2.5-1.3-3.9 0-1.7-1.3-3-3-3h-4c-1.7 0-3 1.3-3 3 0 1.4-.5 2.8-1.3 3.9L5 11.5v2c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2z" />
  </React.Fragment>,
  'Oil'
);

export const VesselIcon = createSvgIcon(
  <React.Fragment>
    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2z" />
  </React.Fragment>,
  'Vessel'
);