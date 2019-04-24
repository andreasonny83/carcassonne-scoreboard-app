import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { updateUserData } from '../../actions';
import { ProfileWithStyles } from './ProfileWithStyles';

const mapDispactToProps = {
  updateUserData,
  push,
};

export const UserProfile = connect(
  null,
  mapDispactToProps
)(ProfileWithStyles);
