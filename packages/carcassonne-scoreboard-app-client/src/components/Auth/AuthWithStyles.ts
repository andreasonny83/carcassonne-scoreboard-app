import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { AuthComponent } from './Auth';

const styles = ({ spacing, breakpoints, palette }: Theme) =>
  createStyles({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: spacing.unit * 3,
      marginRight: spacing.unit * 3,
      [breakpoints.up(500 + spacing.unit * 3 * 2)]: {
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },

    avatar: {
      margin: spacing.unit,
      backgroundColor: palette.secondary.main,
    },

    card: {
      marginTop: spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
    },

    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: spacing.unit,
    },
    submit: {
      marginTop: spacing.unit * 3,
    },
  });

export type IAuthWithStyles = WithStyles<typeof styles>;

export const AuthWithStyles = withStyles(styles)(AuthComponent);
