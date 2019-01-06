import { connect } from 'react-redux';
import { signOut } from '../../actions';
import { MainComponent } from './Main';

const mapDispatchToProps = {
  signOut,
};

export const Main = connect(
  null,
  mapDispatchToProps
)(MainComponent);
