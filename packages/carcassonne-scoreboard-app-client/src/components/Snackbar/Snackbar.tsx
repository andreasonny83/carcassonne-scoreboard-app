import React, { PureComponent } from 'react';
import twemoji from 'twemoji';
import { Snackbar as SnackbarUI, Slide } from '@material-ui/core';
import { SnackbarStylesProps } from './SnackbarWithStyles';

class TransitionUp extends PureComponent {
  public render() {
    return <Slide {...this.props} direction="up" />;
  }
}

interface SnackbarProps extends SnackbarStylesProps {
  notifications: any;
  closeNotification(): void;
}

/* tslint:disable:max-classes-per-file */
export class Snackbar extends PureComponent<SnackbarProps> {
  public render() {
    const { notifications, closeNotification, classes } = this.props;
    const defaultProps = {
      key: 'notification-message',
      timeout: 5000,
    };
    const { key = defaultProps.key, message, open, timeout = defaultProps.timeout } = notifications;
    const messageParsed = twemoji.parse(String(message), {
      base: '/',
      folder: 'svg',
      ext: '.svg',
      size: 24,
    });

    return (
      <SnackbarUI
        open={open}
        onClose={closeNotification}
        TransitionComponent={TransitionUp}
        ContentProps={{
          'aria-describedby': `${key}`,
        }}
        message={
          <p
            className={classes.message}
            dangerouslySetInnerHTML={{ __html: messageParsed }}
            id={key}
          />
        }
        autoHideDuration={timeout}
      />
    );
  }
}
