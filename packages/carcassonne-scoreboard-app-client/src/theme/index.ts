import { createMuiTheme, Theme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0D47A1',
      light: 'rgb(61, 107, 179)',
      dark: 'rgb(9, 49, 112)',
      contrastText: '#FFEB3B',
    },
    secondary: {
      main: '#FAB505',
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
    useNextVariants: true,
    fontSize: 16,
    fontWeightMedium: 500,
    fontFamily: "'Raleway', Lucida Grande, sans-serif",
  },
});

export const theme: Theme = {
  ...defaultTheme,

  typography: {
    ...defaultTheme.typography,

    h5: {
      ...defaultTheme.typography.h5,
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '1.5rem'
      }
    },

    h6: {
      ...defaultTheme.typography.h6,
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '1rem',
      },
    },
  },
};

(window as any).theme = theme;
