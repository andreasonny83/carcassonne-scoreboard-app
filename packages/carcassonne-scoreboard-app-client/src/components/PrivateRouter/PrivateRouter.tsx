import React, { PureComponent } from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { Auth } from 'aws-amplify';
import { IUser, UserContextProvider } from './user.context';

interface PrivateRouterProps extends RouteProps {
  target: React.ComponentClass;
  redirectTo: string;
  isSignedIn: boolean;
  exact?: boolean;
  userSignedIn(): void;
  signedOut(): void;
}

interface PrivateRouterState {
  user: IUser;
  loading: boolean;
}

const defaultUser: IUser = {
  username: '',
  email: '',
  nickname: '',
};

const initialState: PrivateRouterState = {
  user: defaultUser,
  loading: true,
};

export class PrivateRouterComponent extends PureComponent<PrivateRouterProps, PrivateRouterState> {
  public readonly state: PrivateRouterState = initialState;

  public async componentDidMount() {
    const { signedOut, userSignedIn } = this.props;
    let user;

    try {
      user = await Auth.currentAuthenticatedUser();
    } catch (err) {
      this.setState({
        loading: false,
      });

      signedOut();
      return;
    }

    userSignedIn();

    if (user && user.username) {
      this.setState({
        user: {
          username: user.username,
          email: user.attributes.email,
          nickname: user.attributes.nickname,
        },
        loading: false,
      });
    }
  }

  public render(): JSX.Element {
    const { target, redirectTo, location, isSignedIn, ...rest } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Route
        {...rest}
        render={props => this.renderRoute(target, isSignedIn, redirectTo, location, props)}
      />
    );
  }

  private renderRoute(
    TargetComponent: any,
    isSignedIn: boolean,
    redirectTo: string,
    location: any,
    props: any
  ): JSX.Element {
    console.log(props);

    return isSignedIn ? (
      <UserContextProvider value={this.state.user}>
        <TargetComponent {...props} />
      </UserContextProvider>
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
