import { withStyles, WithStyles } from '@material-ui/core';

import { Snackbar } from './Snackbar';

const styles = () => ({
  message: {
    fontSize: '1rem',
    'box-sizing': 'content-box',
    '& img': {
      width: '28px',
      height: '28px',
      padding: '0 4px',
      verticalAlign: 'middle',
    },
  },
});

export type SnackbarStylesProps = WithStyles<typeof styles>;

export const SnackbarWithStyles = withStyles(styles)(Snackbar);
