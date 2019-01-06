import React, { PureComponent } from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { Auth } from 'aws-amplify';
import { IUser, UserContextProvider } from './user.context';

interface PrivateRouterProps extends RouteProps {
  target: React.ComponentClass;
  redirectTo: string;
  isSignedIn: boolean;
  loading: boolean;
  userSignedIn(): void;
  signedOut(): void;
  toggleLoading(loadingStatus: boolean): void;
}

interface PrivateRouterState {
  readonly user: IUser;
}

const defaultUser: IUser = {
  username: '',
  email: '',
  nickname: '',
};

const initialState: PrivateRouterState = {
  user: defaultUser,
};

export class PrivateRouterComponent extends PureComponent<PrivateRouterProps, PrivateRouterState> {
  public readonly state: PrivateRouterState = initialState;

  public async componentDidMount() {
    const { toggleLoading, signedOut, userSignedIn } = this.props;

    toggleLoading(true);
    let user;

    try {
      user = await Auth.currentAuthenticatedUser();
    } catch (err) {
      toggleLoading(false);
      signedOut();
      return;
    }

    userSignedIn();
    toggleLoading(false);

    if (user.username) {
      this.setState({
        user: {
          username: user.username,
          email: user.attributes.email,
          nickname: user.attributes.nickname,
        },
      });
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
            <UserContextProvider value={this.state.user}>
              <TargetComponent {...props} />
            </UserContextProvider>
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
