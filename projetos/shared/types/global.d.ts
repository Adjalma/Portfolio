import { ElementType } from 'react';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/Grid' {
  interface GridProps {
    item?: boolean;
    container?: boolean;
    component?: ElementType | string;
    xs?: number | boolean;
    sm?: number | boolean;
    md?: number | boolean;
    lg?: number | boolean;
    xl?: number | boolean;
    spacing?: number;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  }
}

declare module '@mui/material/ListItem' {
  interface ListItemProps {
    button?: boolean;
    selected?: boolean;
    component?: ElementType;
    divider?: boolean;
    onClick?: () => void;
    alignItems?: 'flex-start' | 'center';
  }
} 