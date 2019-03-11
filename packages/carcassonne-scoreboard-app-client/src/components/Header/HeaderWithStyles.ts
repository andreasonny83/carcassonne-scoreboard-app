import { connect } from 'react-redux';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { signOut } from '../../actions';
import { HeaderComponent } from './Header';

const styles = ({ palette, spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${palette.grey[300]}`,
      marginBottom: spacing.unit,
      [breakpoints.up(500 + spacing.unit * 3 * 2)]: {
        marginBottom: spacing.unit * 3,
      },

    },
    menuItem: {
      color: palette.primary.main,
    },
  });

const mapStateToProps = (state: any) => ({
  isSignedIn: state.auth.isSignedIn,
});

const mapDispatchToProps = {
  signOut,
};

export type WithStylesProps = WithStyles<typeof styles>;

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HeaderComponent));
