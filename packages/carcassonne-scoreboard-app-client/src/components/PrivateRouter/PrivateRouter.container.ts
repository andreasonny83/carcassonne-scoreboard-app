import { connect } from 'react-redux';
import { signedOut, toggleLoading, userSignedIn } from '../../actions';
import { PrivateRouterComponent } from './PrivateRouter';

const mapDispactToProps = {
  userSignedIn,
  signedOut,
  toggleLoading,
};

const mapStateToProps = (state: any) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    loading: state.auth.loading,
  };
};

export const PrivateRouter = connect(
  mapStateToProps,
  mapDispactToProps
)(PrivateRouterComponent);
