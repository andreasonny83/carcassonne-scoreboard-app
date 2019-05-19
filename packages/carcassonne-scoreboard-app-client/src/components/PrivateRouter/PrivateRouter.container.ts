import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import withWidth from '@material-ui/core/withWidth';

import { signedOut, toggleLoading, userSignedIn, getUserData } from '../../actions';
import { PrivateRouterComponent } from './PrivateRouter';

const mapDispactToProps = {
  userSignedIn,
  getUserData,
  signedOut,
  toggleLoading,
  push,
};

const mapStateToProps = (state: any) => ({
  isSignedIn: state.auth.isSignedIn,
  loading: state.auth.loading,
  user: state.user,
});

export const PrivateRouter = connect(
  mapStateToProps,
  mapDispactToProps
)(withWidth()(PrivateRouterComponent));
