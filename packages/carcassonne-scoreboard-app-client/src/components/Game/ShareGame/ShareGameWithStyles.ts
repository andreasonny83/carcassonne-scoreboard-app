import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { ShareGame } from './ShareGame';

const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      marginTop: spacing(1),
      marginBottom: spacing(1),
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
