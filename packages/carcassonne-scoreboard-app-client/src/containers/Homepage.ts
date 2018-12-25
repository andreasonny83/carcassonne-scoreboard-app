import { connect } from 'react-redux';
import { signOut } from '../actions';
import { HomePageComponent } from '../components/Homepage';

const mapDispatchToProps = {
  signOut,
};

export const HomePage = connect(
  null,
  mapDispatchToProps
)(HomePageComponent);
