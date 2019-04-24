import { withStyles, WithStyles, Theme } from '@material-ui/core';

import { NewPlayer } from './NewPlayer';

const styles = ({ spacing }: Theme) => ({
  formControl: {
    margin: spacing(3, 0),
  },
  gridItem: {
    padding: spacing(1),
  },
  formPlayerControl: {
    flexFlow: 'row',
    alignItems: 'center',
  },
  playerSelect: {
    flex: '1 1 auto',
  },
  meeple: {
    margin: '0 0.2em',
    stroke: 'black',
    strokeWidth: '5px',
    ['stroke-opacity']: '0.75',
  },
  deleteContainer: {
    'text-align': 'center',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ef2323',
    },
  },
});

export type NewPlayerStylesProps = WithStyles<typeof styles>;

export const NewPlayerWithStyles = withStyles(styles)(NewPlayer);
