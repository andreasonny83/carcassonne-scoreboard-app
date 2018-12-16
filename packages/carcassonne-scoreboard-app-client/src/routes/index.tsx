import React, { Component } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router';
import { Auth } from 'aws-amplify';
import { AuthPage, HomePage } from '../connected';

const NotFoundPage = () => <div className="NotFound">Page not found</div>;

interface PrivateRouterProps extends RouteProps {
  target: React.ComponentClass;
}

interface PrivateRouterState {
  userAuthenticated: boolean;
  busy: boolean;
}

const initialState: PrivateRouterState = {
  userAuthenticated: false,
  busy: true,
};

class PrivateRouter extends Component<PrivateRouterProps, PrivateRouterState> {
  public readonly state: PrivateRouterState = initialState;

  public async componentDidMount() {
    await new Promise(res => setTimeout(() => res(), 1000));
    try {
      await Auth.currentAuthenticatedUser();
    } catch (err) {
      this.setState({
        userAuthenticated: false,
        busy: false,
      });
      return;
    }

    this.setState({
      userAuthenticated: true,
      busy: false,
    });
  }

  public render(): JSX.Element {
    const { target: TargetComponent, ...rest } = this.props;
    const { busy, userAuthenticated } = this.state;

    if (busy) {
      return <div>Loading...</div>;
    }

    return (
      <Route
        {...rest}
        render={props =>
          userAuthenticated ? (
            <TargetComponent {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

export const routes = (
  <Switch>
    <PrivateRouter path="/" exact={true} target={HomePage} />
    <Route path="/login" component={AuthPage} />
    <Route component={NotFoundPage} />
  </Switch>
);
