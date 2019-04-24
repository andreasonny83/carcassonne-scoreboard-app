import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { AuthComponent } from './Auth';

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    container: {
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    header: {
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: spacing(1),
      backgroundColor: palette.secondary.main,
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: spacing(2, 3, 3),
    },
    form: {
      width: '100%',
      marginTop: spacing(1),
    },
    submit: {
      marginTop: spacing(3),
    },
    actionButton: {
      marginTop: spacing(2),
    },
  });

export type IAuthWithStyles = WithStyles<typeof styles>;

export const AuthWithStyles = withStyles(styles)(AuthComponent);
