import { withStyles, WithStyles } from '@material-ui/core';

import { UpdateScore } from './UpdateScore';

const styles = () => ({
  meeple: {
    stroke: 'black',
    strokeWidth: '4px',
    'stroke-opacity': '0.75',
  },
});

export type UpdateScoreStylesProps = WithStyles<typeof styles>;

export const UpdateScoreWithStyles = withStyles(styles)(UpdateScore);
