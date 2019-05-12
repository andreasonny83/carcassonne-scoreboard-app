import { withStyles, WithStyles } from '@material-ui/core';
import { LogItems } from './LogItems';
import { LogItem } from './LogItem';

const logItemsStyles = () => ({
  root: {
    width: '100%',
    maxHeight: '242px',
    'overflow-y': 'auto',
  },
});

const logIntemStyles = () => ({
  meeple: {
    stroke: 'black',
    strokeWidth: '3px',
    'stroke-opacity': '0.75',
  },
  dateItem: {
    'text-align': 'right',
  },
});

export type LogItemsStylesProps = WithStyles<typeof logItemsStyles>;
export type LogItemStylesProps = WithStyles<typeof logIntemStyles>;

export const LogItemsWithStyles = withStyles(logItemsStyles)(LogItems);
export const LogItemWithStyles = withStyles(logIntemStyles)(LogItem);
