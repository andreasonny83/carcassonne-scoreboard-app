import { connect } from 'react-redux';
import { updateUserData } from '../../actions';
import { UserProfileComponent } from './Profile';

const mapDispactToProps = {
  updateUserData
};

export const UserProfile = connect(
  null,
  mapDispactToProps
)(UserProfileComponent);
