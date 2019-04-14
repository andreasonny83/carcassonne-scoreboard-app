import { withStyles, WithStyles, Theme } from '@material-ui/core';

import { GameComponent } from './Game';

const styles = ({ spacing, typography, palette }: Theme) => ({
  root: {
    padding: `${spacing.unit * 3}px ${spacing.unit * 2}px`,
  },
  loading: {
    margin: '3em 0',
  },
  gameIdLabel: {
    maxWidth: '18em',
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
    maxWidth: '100%'
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
