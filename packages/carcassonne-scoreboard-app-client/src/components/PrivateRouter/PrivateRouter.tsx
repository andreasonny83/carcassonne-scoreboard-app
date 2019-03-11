import React, { PureComponent } from 'react';
import { RouteProps, Route, Redirect } from 'react-router';

import { IUser, AppContextProvider, IAppContext } from './app.context';

interface PrivateRouterProps extends RouteProps {
  target: React.ComponentClass;
  redirectTo: string;
  isSignedIn: boolean;
  loading: boolean;
  exact?: boolean;
  user: IUser;
  userSignedIn(): void;
  getUserData(): any;
  signedOut(): void;
  push(location: string): void;
}

export class PrivateRouterComponent extends PureComponent<PrivateRouterProps> {
  public componentDidMount() {
    const { getUserData, signedOut, userSignedIn, push, location, isSignedIn } = this.props;

    getUserData()
      .then(() => {
        userSignedIn();
        push((location && location.pathname) || '/app');
      })
      .catch(() => signedOut());
  }

  public render(): JSX.Element {
    const {
      target,
      redirectTo,
      location,
      loading,
      isSignedIn,
      user,
      ...rest
    } = this.props;

    if (loading || !Object.keys(user).length) {
      return <p>Loading...</p>;
    }

    return (
      <Route
        {...rest}
        render={props =>
          this.renderRoute(target, isSignedIn, redirectTo, location, user, props)
        }
      />
    );
  }

  private renderRoute(
    TargetComponent: any,
    isSignedIn: boolean,
    redirectTo: string,
    location: any,
    user: any,
    props: any
  ): JSX.Element {
    const app: IAppContext = {
      user,
    };

    return isSignedIn ? (
      <AppContextProvider value={app}>
        <TargetComponent {...props} />
      </AppContextProvider>
    ) : (
      <Redirect
        to={{
          pathname: redirectTo,
          state: { from: location },
        }}
      />
    );
  }
}
