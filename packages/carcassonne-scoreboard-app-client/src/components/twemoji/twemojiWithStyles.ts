import { withStyles, WithStyles, Theme } from '@material-ui/core';

import { Twemoji as TwemojiComponent, TwemojiProps } from './twemoji';

const styles = (theme: Theme) => ({
  message: {
    'box-sizing': 'content-box',
    '& img': {
      width: (props: TwemojiProps) => `${props.size || 24}px`,
      height: (props: TwemojiProps) => `${props.size || 24}px`,
      padding: '0 4px',
      verticalAlign: 'middle',
    },
  },
}) as any;

export type twemojiWithStyles = WithStyles<typeof styles>;

export const Twemoji = withStyles(styles)(TwemojiComponent);
