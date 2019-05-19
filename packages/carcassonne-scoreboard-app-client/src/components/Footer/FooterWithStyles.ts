import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { FooterComponent } from './Footer';

const styles = ({ palette, spacing, breakpoints }: Theme) =>
  createStyles({
    footer: {
      backgroundColor: palette.background.paper,
      marginTop: 0,
      borderTop: `1px solid ${palette.secondary.light}`,
      [breakpoints.up('sm')]: {
        marginTop: spacing(10),
      },
      padding: spacing(6, 0),
    },
  });

export type FooterWithStyles = WithStyles<typeof styles>;

export const Footer = withStyles(styles)(FooterComponent);
