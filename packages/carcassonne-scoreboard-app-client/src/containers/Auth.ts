import { connect } from 'react-redux';
import { signIn, verifyUser, undoCodeVerification, codeVerified, toggleLoading } from '../actions';
import { AuthComponent } from '../components/Auth';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  signIn,
  verifyUser,
  undoCodeVerification,
  codeVerified,
  toggleLoading
};

export const AuthPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);
