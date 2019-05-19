import { withStyles, WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

import { WelcomeComponent } from './Welcome';

const styles = ({ spacing, breakpoints }: Theme) => ({
  mainFeaturedPost: {
    marginBottom: 0,
    [breakpoints.up('sm')]: {
      marginBottom: spacing(4),
    }
  },
  mainFeaturedPostContent: {
    padding: spacing(6),
  },
  form: {
    maxWidth: '500px',
    marginTop: '2em',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em 0.5em',
  },
  joinGame: {
    marginTop: '3em',
    marginBottom: '0.75em',
  },
});

export type WelcomeStylesProps = WithStyles<typeof styles>;

export const WelcomeWithStyles = withStyles(styles)(withWidth()(WelcomeComponent));
