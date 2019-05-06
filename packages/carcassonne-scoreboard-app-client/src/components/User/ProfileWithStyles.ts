import { withStyles, WithStyles, Theme } from '@material-ui/core';

import { Profile } from './Profile';

const styles = ({ spacing, palette }: Theme) => ({
  root: {
    padding: spacing(2),
    marginBottom: spacing(2),
  },
  title: {
    marginBottom: spacing(4),
  },
  loading: {
    margin: '3em 0',
  },
  formControl: {
    maxWidth: '600px',
  },
  block: {
    marginBottom: spacing(4),
  },
  avatar: {
    backgroundColor: 'rgba(224, 224, 224, 0.25)',
    border: `1px solid ${palette.grey[300]}`,
    borderRadius: spacing(1),
    'box-sizing': 'content-box',
    padding: spacing(1, 1, 0),
    marginBottom: spacing(2),
    overflow: 'hidden',

    '& svg': {
      filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.3))',
    }
  },
  action: {
    marginTop: spacing(2),
  },
  button: {
    margin: spacing(1, 0, 0, 2),
  },
});

export type ProfileStylesProps = WithStyles<typeof styles>;

export const ProfileWithStyles = withStyles(styles)(Profile);
