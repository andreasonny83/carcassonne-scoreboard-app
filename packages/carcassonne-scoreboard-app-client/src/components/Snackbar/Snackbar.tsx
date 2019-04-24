import React, { PureComponent } from 'react';
import { Snackbar as SnackbarUI, Slide } from '@material-ui/core';

import { Twemoji } from '../twemoji';

const TransitionUp = (props: any) => <Slide {...props} direction="up" />;

interface SnackbarProps {
  notifications: any;
  closeNotification(): void;
}

export class Snackbar extends PureComponent<SnackbarProps> {
  public render() {
    const { notifications, closeNotification } = this.props;
    const defaultProps = {
      timeout: 5000,
    };
    const { message, open, timeout = defaultProps.timeout } = notifications;

    return (
      <SnackbarUI
        open={open}
        onClose={closeNotification}
        TransitionComponent={TransitionUp}
        ContentProps={{
          'aria-describedby': 'notification-message',
          style: {
            display: 'flex',
            justifyContent: 'center',
          },
        }}
        message={<Twemoji copy={message} />}
        autoHideDuration={timeout}
      />
    );
  }
}
