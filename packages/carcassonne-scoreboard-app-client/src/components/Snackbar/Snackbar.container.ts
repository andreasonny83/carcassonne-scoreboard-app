import { connect } from 'react-redux';
import { closeNotification } from '../../actions';
import { SnackbarWithStyles } from './SnackbarWithStyles';

const mapStateToProps = (state: any) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = {
  closeNotification,
};

export const Snackbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarWithStyles);
