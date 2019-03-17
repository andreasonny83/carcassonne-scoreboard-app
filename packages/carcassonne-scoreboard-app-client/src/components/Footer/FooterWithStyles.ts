import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { FooterComponent } from './Footer';

const styles = ({ palette, spacing, breakpoints }: Theme) =>
  createStyles({
    footer: {
      backgroundColor: palette.background.paper,
      marginTop: spacing.unit * 4,
      [breakpoints.up('sm')]: {
        marginTop: spacing.unit * 8,
      },
      padding: `${spacing.unit * 6}px 0`,
    },
  });

export type FooterWithStyles = WithStyles<typeof styles>;

export const Footer = withStyles(styles)(FooterComponent);
