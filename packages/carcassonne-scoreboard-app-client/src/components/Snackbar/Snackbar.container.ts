import { connect } from 'react-redux';
import { closeNotification } from '../../actions';
import { Snackbar as SnackbarComponent } from './Snackbar';

const mapStateToProps = (state: any) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = {
  closeNotification,
};

export const Snackbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarComponent);
