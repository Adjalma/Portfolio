import { ElementType } from 'react';
import { Theme } from '@mui/material/styles';
import { GridProps as MuiGridProps } from '@mui/material/Grid';

declare module '@mui/material/Grid' {
  interface GridProps extends MuiGridProps {
    item?: boolean;
    container?: boolean;
    component?: ElementType | string;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    custom?: {
      grid?: {
        item?: boolean;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      grid?: {
        item?: boolean;
      };
    };
  }
} 