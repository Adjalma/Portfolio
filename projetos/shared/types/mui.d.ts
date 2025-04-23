import { ElementType } from 'react';
import { Theme } from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    custom?: {
      grid?: {
        item?: boolean;
      };
    };
  }
}

declare module '@mui/material/Grid' {
  interface GridProps {
    item?: boolean;
    container?: boolean;
    component?: ElementType<any>;
    xs?: number | boolean;
    sm?: number | boolean;
    md?: number | boolean;
    lg?: number | boolean;
    xl?: number | boolean;
    spacing?: number;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    children?: React.ReactNode;
    className?: string;
    sx?: any;
  }
}

declare module '@mui/material/ListItem' {
  interface ListItemProps {
    button?: boolean;
    selected?: boolean;
    component?: ElementType<any>;
    divider?: boolean;
    onClick?: () => void;
    alignItems?: 'flex-start' | 'center';
    children?: React.ReactNode;
    className?: string;
    sx?: any;
  }
}

declare module '@mui/material' {
  interface DefaultComponentProps<T extends ElementType> {
    component?: T;
  }
}