import { withStyles, WithStyles, Theme } from '@material-ui/core';

import { GameComponent } from './Game';

const styles = ({ spacing, typography, palette }: Theme) => ({
  root: {
    padding: spacing.unit * 3,
  },
  loading: {
    margin: '3em 0',
  },
  expansionPanel: {
    backgroundColor: palette.grey[100],
  },
  meepleColumn: {
    flexBasis: '60px',
  },
  content: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '50%',
  },
  buttons: {
    width: '800px',
    maxWidth: '100%',
  },
  actionButtons: {
    marginTop: spacing.unit * 2,
    marginBottom: spacing.unit * 2,
  },
  scoreColumn: {
    'text-align': 'right',
    flex: '1 1 auto',
  },
  heading: {
    fontSize: typography.pxToRem(15),
  },
  scoreHeading: {
    fontSize: typography.pxToRem(15),
    paddingRight: '1em',
  },
  details: {
    alignItems: 'center',
  },
});

export type GameStylesProps = WithStyles<typeof styles>;

export const GameWithStyles = withStyles(styles)(GameComponent);
