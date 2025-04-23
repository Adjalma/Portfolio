import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiGrid: {
      defaultProps: {
        item: false
      },
      styleOverrides: {
        root: {
          // Estilos personalizados para o Grid
        }
      }
    }
  },
  custom: {
    grid: {
      item: true
    }
  }
}); 