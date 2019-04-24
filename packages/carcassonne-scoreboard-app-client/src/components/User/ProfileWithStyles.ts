import { withStyles, WithStyles, Theme } from '@material-ui/core';

import { Profile } from './Profile';

const styles = ({ spacing, palette }: Theme) => ({
  root: {
    padding: spacing(2, 4),
    marginBottom: spacing(2),
  },
  avatar: {
    backgroundColor: 'rgba(224, 224, 224, 0.25)',
    border: `1px solid ${palette.grey[300]}`,
    borderRadius: spacing(1),
    'box-sizing': 'content-box',
    padding: spacing(1, 1, 0),
    marginBottom: spacing(2),
  },
});

export type ProfileStylesProps = WithStyles<typeof styles>;

export const ProfileWithStyles = withStyles(styles)(Profile);
