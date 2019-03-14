import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#0D47A1',
      light: 'rgb(61, 107, 179)',
      dark: 'rgb(9, 49, 112)',
      contrastText: '#FFEB3B',
    },
    secondary: {
      main: '#FBC02D',
      light: 'rgb(251, 204, 87)',
      dark: 'rgb(175, 134, 31)',
      contrastText: '#000000',
    },
    type: 'light',
  },
  typography: {
    useNextVariants: true,
    fontSize: 16,
    fontWeightMedium: 500,
    fontFamily: "'Raleway', Lucida Grande, sans-serif",

    h3: {
      fontSize: '2rem',
    },
  },
});

export const theme = {
  ...defaultTheme,
  typography: {
    ...defaultTheme.typography,
    h3: {
      ...defaultTheme.typography.h3,
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: '2.75rem',
      },
    },
  },
};

(window as any).theme = theme;
