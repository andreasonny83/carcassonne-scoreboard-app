import { connect } from 'react-redux';
import { signOut, showNotification } from '../../actions';
import { MainComponent } from './Main';

const mapDispatchToProps = {
  signOut,
  showNotification,
};

export const Main = connect(
  null,
  mapDispatchToProps
)(MainComponent);
