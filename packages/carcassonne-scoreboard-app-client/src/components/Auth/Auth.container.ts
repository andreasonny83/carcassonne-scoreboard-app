import { connect } from 'react-redux';
import {
  signIn,
  signUp,
  verifyUser,
  undoCodeVerification,
  verifyCode,
  sendNewCode,
  toggleLoading,
  showNotification,
} from '../../actions';
import { AuthWithStyles } from './AuthWithStyles';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  signIn,
  signUp,
  verifyUser,
  undoCodeVerification,
  verifyCode,
  sendNewCode,
  toggleLoading,
  showNotification,
};

export const Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthWithStyles);
