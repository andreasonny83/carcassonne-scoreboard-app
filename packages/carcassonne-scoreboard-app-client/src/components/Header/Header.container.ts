import { connect } from 'react-redux';

import { signOut } from '../../actions';
import { HeaderWithStyles } from './HeaderWithStyles';

const mapStateToProps = (state: any) => ({
  isSignedIn: state.auth.isSignedIn,
  user: state.user,
});

const mapDispatchToProps = {
  signOut,
};

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderWithStyles);
