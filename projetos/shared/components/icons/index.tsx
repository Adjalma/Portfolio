import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { createSvgIcon } from '@mui/material/utils';

export const OilIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M20 13.5v-2l-1.2-1.6c-.8-1.1-1.3-2.5-1.3-3.9 0-1.7-1.3-3-3-3h-4c-1.7 0-3 1.3-3 3 0 1.4-.5 2.8-1.3 3.9L5 11.5v2c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2zM7.5 12c-.8 0-1.5-.7-1.5-1.5S6.7 9 7.5 9s1.5.7 1.5 1.5S8.3 12 7.5 12zm9 0c-.8 0-1.5-.7-1.5-1.5S15.7 9 16.5 9s1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
  </SvgIcon>
);

export const VesselIcon = createSvgIcon(
  <React.Fragment>
    <path d="M20 13.5v-2h-1v2h1zm-2-7.5v6h3v-6h-3zm4 8c0 .55-.45 1-1 1h-1v2h1c1.65 0 3-1.35 3-3v-2h-2v2z" />
  </React.Fragment>,
  'Vessel'
);