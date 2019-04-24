import { withStyles, WithStyles, Theme } from '@material-ui/core';

import { PlayerItem } from './PlayerItem';

const styles = ({ palette }: Theme) => ({
  root: {},
  inline: {},
  meeple: {
    stroke: 'black',
    strokeWidth: '4px',
    'stroke-opacity': '0.75',
  },
  listItemSelected: {
    backgroundColor: `${palette.grey[300]}!important`,
  },
  listItemText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    'white-space': 'nowrap',
  },
});

export type PlayerItemStylesProps = WithStyles<typeof styles>;

export const PlayerItemWithStyles = withStyles(styles)(PlayerItem);
