import { withStyles, WithStyles, Theme } from '@material-ui/core';
import { PlayerItems } from './PlayerItems';

const styles = (theme: Theme) => ({
  root: {},
});

export type PlayerItemsStylesProps = WithStyles<typeof styles>;

export const PlayerItemsWithStyles = withStyles(styles)(PlayerItems);
