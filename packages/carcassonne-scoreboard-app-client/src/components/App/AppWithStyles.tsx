import { withRouter } from 'react-router';
import { withStyles, WithStyles, Theme } from '@material-ui/core';

import { AppComponent } from './AppComponent';

const styles = ({ breakpoints, spacing, palette }: Theme) => ({
  layout: {
    width: 'auto',
    margin: 0,
    backgroundColor: palette.background.paper,
    [breakpoints.up('sm')]: {
      backgroundColor: palette.grey[400],
    },
  },
  grid: {
    minHeight: '100vh',
    marginBottom: 0,
  },
  main: {
    marginLeft: 0,
    marginRight: 0,
    flex: '1 1 auto',
    [breakpoints.up('sm')]: {
      marginLeft: spacing(2),
      marginRight: spacing(2),
    },
    [breakpoints.up(breakpoints.values.lg + spacing(4))]: {
      width: breakpoints.values.lg,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  mainFeaturedPost: {
    backgroundColor: palette.grey[100],
    color: palette.common.white,
    marginBottom: spacing(4),
  },
  footer: {
    paddingBottom: 0,
  },
});

export type AppWithStylesProps = WithStyles<typeof styles>;

export const AppWithStyles = withRouter(withStyles(styles)(AppComponent));
