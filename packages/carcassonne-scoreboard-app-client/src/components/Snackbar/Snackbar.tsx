import React, { PureComponent } from 'react';
import { Snackbar as Notification, Slide } from '@material-ui/core';

class TransitionUp extends PureComponent {
  public render() {
    return <Slide {...this.props} direction="up" />;
  }
}

interface SnackbarProps {
  notifications: any;
  closeNotification(): void;
}

/* tslint:disable:max-classes-per-file */
export class SnackbarComponent extends PureComponent<SnackbarProps> {
  public render() {
    const { notifications, closeNotification } = this.props;
    const defaultProps = {
      key: 'notification-message',
      timeout: 5000,
    };
    const { key = defaultProps.key, message, open, timeout = defaultProps.timeout } = notifications;

    return (
      <Notification
        open={open}
        onClose={closeNotification}
        TransitionComponent={TransitionUp}
        ContentProps={{
          'aria-describedby': `${key}`,
        }}
        message={<span id={key}>{message}</span>}
        autoHideDuration={timeout}
      />
    );
  }
}
