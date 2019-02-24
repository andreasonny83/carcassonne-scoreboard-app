import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { showNotification as showNotificationAction } from '../../actions';
import { routes } from '../../routes';
import { Snackbar } from '../Snackbar';

import './App.css';

interface AppWrapperComponentProps {
  showNotification(message: string, timeout?: number): void;
}

export class AppWrapperComponent extends PureComponent<
  AppWrapperComponentProps & RouteComponentProps
> {
  public render(): JSX.Element {
    return (
      <div className="App">
        {routes}
        <Snackbar />
      </div>
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
