import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiGrid: {
      defaultProps: {
        container: false
      },
      styleOverrides: {
        root: {
          // Estilos customizados aqui
        }
      }
    },
    MuiListItem: {
      defaultProps: {
        button: false
      }
    }
  },
  custom: {
    grid: {
      item: true
    }
  }
}); 