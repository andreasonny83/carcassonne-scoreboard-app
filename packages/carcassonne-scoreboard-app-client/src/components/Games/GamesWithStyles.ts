import { withStyles, WithStyles, Theme } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

import { Games } from './Games';

const styles = ({ spacing, palette, breakpoints }: Theme) => ({
  root: {
    padding: spacing(2),
    marginBottom: 0,
    [breakpoints.up('sm')]: {
      marginBottom: spacing(2),
    },
  },
  title: {
    marginBottom: spacing(4),
  },
  sections: {
    marginTop: spacing(4),
  },
  loading: {
    margin: '3em 0',
  },
  goBack: {
    marginBottom: '1em',
  },
  formControl: {
    maxWidth: '600px',
  },
  block: {
    marginBottom: spacing(4),
  },
});

export type GamesStylesProps = WithStyles<typeof styles>;

export const GamesWithStyles = withStyles(styles)(withWidth()(Games));
