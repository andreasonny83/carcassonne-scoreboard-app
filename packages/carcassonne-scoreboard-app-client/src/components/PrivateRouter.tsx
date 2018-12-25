import React, { PureComponent } from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { Auth } from 'aws-amplify';

interface PrivateRouterProps extends RouteProps {
  target: React.ComponentClass;
  redirectTo: string;
  isSignedIn: boolean;
  loading: boolean;
  userSignedIn(): void;
  signedOut(): void;
  toggleLoading(loadingStatus: boolean): void;
}

export class PrivateRouterComponent extends PureComponent<PrivateRouterProps> {
  public async componentDidMount() {
    const { toggleLoading, signedOut, userSignedIn } = this.props;
    let user;

    toggleLoading(true);

    try {
      user = await Auth.currentAuthenticatedUser();
    } catch (err) {
      toggleLoading(false);
      signedOut();
      return;
    }

    toggleLoading(false);

    if (user.username) {
      userSignedIn();
    }
  }

  public render(): JSX.Element {
    const { target: TargetComponent, redirectTo, isSignedIn, loading, ...rest } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Route
        {...rest}
        render={props =>
          isSignedIn ? (
            <TargetComponent {...props} />
          ) : (
            <Redirect
              to={{
                pathname: redirectTo,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}
