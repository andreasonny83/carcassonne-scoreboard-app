import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0D47A1',
      light: 'rgb(61, 107, 179)',
      dark: 'rgb(9, 49, 112)',
      contrastText: '#FFEB3B',
    },
    secondary: {
      main: '#E1A205',
      light: 'rgb(251, 204, 87)',
      dark: 'rgb(175, 134, 31)',
      contrastText: '#111111',
    },
    type: 'light',
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 600,
      lg: 1100,
      xl: 1280,
    },
  },

  direction: 'ltr',

  typography: {
    fontSize: 16,
    fontWeightMedium: 500,
    fontFamily: "'Raleway', Lucida Grande, sans-serif",
  },
});
