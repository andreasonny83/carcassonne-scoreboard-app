import { withStyles, WithStyles, Theme } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

import { GameComponent } from './Game';

const styles = ({ spacing, typography, palette, breakpoints }: Theme) => ({
  root: {
    padding: spacing(1, 2, 3, 2),
    [breakpoints.up('sm')]: {
      padding: spacing(3),
    },
  },
  loading: {
    margin: '3em 0',
  },
  gameCreated: {
    fontSize: '0.8rem',
  },
  title: {
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.2em',
    display: '-webkit-box',
    maxHeight: '2.4em',
    marginBottom: spacing(2),
  },
  logTitle: {
    marginTop: spacing(4),
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
    marginTop: spacing(2),
    marginBottom: spacing(2),
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

export const GameWithStyles = withStyles(styles)(withWidth()(GameComponent));
