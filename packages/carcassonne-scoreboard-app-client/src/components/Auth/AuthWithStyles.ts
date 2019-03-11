import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { AuthComponent } from './Auth';

const styles = ({ spacing, breakpoints, palette }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'column',
    },
    avatar: {
      margin: spacing.unit,
      backgroundColor: palette.secondary.main,
    },
    card: {
      [breakpoints.up(500 + spacing.unit * 3 * 2)]: {
        marginTop: spacing.unit * 4,
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
    },
    form: {
      width: '100%',
      marginTop: spacing.unit,
    },
    submit: {
      marginTop: spacing.unit * 3,
    },
  });

export type IAuthWithStyles = WithStyles<typeof styles>;

export const AuthWithStyles = withStyles(styles)(AuthComponent);
