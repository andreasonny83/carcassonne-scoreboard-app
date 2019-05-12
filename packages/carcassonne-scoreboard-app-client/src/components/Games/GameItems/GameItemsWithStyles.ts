import { withStyles, WithStyles } from '@material-ui/core';
import { GameItems } from './GameItems';

const styles = () => ({
  root: {
    width: '100%',
  },
});

export type GameItemsStylesProps = WithStyles<typeof styles>;

export const GameItemsWithStyles = withStyles(styles)(GameItems);
