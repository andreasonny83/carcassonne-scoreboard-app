import React, { PureComponent } from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { IUser } from '../../user';
import { PrivateRouterContainer } from './RouteContainer.container';

interface PrivateRouterProps extends RouteProps {
  width: Breakpoint;
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
    const { getUserData, signedOut, userSignedIn, push, location } = this.props;

    getUserData()
      .then(() => {
        userSignedIn();
        push((location && location.pathname) || '/app');
      })
      .catch(() => signedOut());
  }

  public render(): JSX.Element {
    const { target, redirectTo, location, width, loading, isSignedIn, user, ...rest } = this.props;
    const isMobile = !isWidthUp('sm', width);

    if (loading || !Object.keys(user).length) {
      return (
        <Paper elevation={isMobile ? 0 : 1} square={isMobile} className="paper" style={{ padding: '4em' }}>
          <Grid direction="column" alignItems="center" container>
            <CircularProgress style={{ marginBottom: '2em' }} />
            <Typography>Authenticating user...</Typography>
          </Grid>
        </Paper>
      );
    }

    return (
      <Route
        {...rest}
        render={props => this.renderRoute(target, isSignedIn, redirectTo, location, user, props)}
      />
    );
  }

  private renderRoute(
    target: any,
    isSignedIn: boolean,
    redirectTo: string,
    location: any,
    user: any,
    props: any
  ): JSX.Element {
    return isSignedIn ? (
      <PrivateRouterContainer target={target} user={user} props={props} />
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
