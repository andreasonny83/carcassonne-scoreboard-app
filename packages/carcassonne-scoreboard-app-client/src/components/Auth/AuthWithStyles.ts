import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { AuthComponent } from './Auth';

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    container: {
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    avatar: {
      margin: spacing.unit,
      backgroundColor: palette.secondary.main,
    },
    card: {
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
