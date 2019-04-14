import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { ShareGame } from './ShareGame';

const styles = ({ palette, spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      marginTop: spacing.unit,
      marginBottom: spacing.unit,
      justifyContent: 'center',
      [breakpoints.up('sm')]: {
        justifyContent: 'flex-start',
      },
    },
    gameIdLabel: {
      maxWidth: '18em',
    },
    copyIcon: {
      textAlign: 'right',
      [breakpoints.up('sm')]: {
        textAlign: 'left',
      },
    },
  });

export type ShareGameStylesProps = WithStyles<typeof styles>;

export const ShareGameWithStyles = withStyles(styles)(ShareGame);
