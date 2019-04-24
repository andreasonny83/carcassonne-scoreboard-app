import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { FooterComponent } from './Footer';

const styles = ({ palette, spacing, breakpoints }: Theme) =>
  createStyles({
    footer: {
      backgroundColor: palette.background.paper,
      marginTop: spacing(14),
      [breakpoints.up('sm')]: {
        marginTop: spacing(10),
      },
      padding: spacing(6, 0),
    },
  });

export type FooterWithStyles = WithStyles<typeof styles>;

export const Footer = withStyles(styles)(FooterComponent);
