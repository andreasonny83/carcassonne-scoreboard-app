import { withStyles, WithStyles } from '@material-ui/core';
import { GameItem } from './GameItem';

const styles = () => ({
  listItemRoot: {
    paddingRight: '90px',
  },
  listItemText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    'white-space': 'nowrap',
  },
});

export type GameItemStylesProps = WithStyles<typeof styles>;

export const GameItemWithStyles = withStyles(styles)(GameItem);
