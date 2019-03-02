import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

import { showNotification as showNotificationAction } from '../../actions';
import { routes } from '../../routes';
import { Snackbar } from '../Snackbar';

interface AppWrapperComponentProps {
  appName: string;
  showNotification(message: string, timeout?: number): void;
}

export class AppWrapperComponent extends PureComponent<
  AppWrapperComponentProps & RouteComponentProps
> {
  public render(): JSX.Element {
    const { appName } = this.props;
    const routerConfig = {
      appName
    };

    return (
      <>
        {routes(routerConfig)}
        <Snackbar />
      </>
    );
  }
}

const mapDispatchToProps = {
  showNotification: showNotificationAction,
};

export const AppComponent = withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AppWrapperComponent)
);
