import React, { Component } from 'react';
import { RouteContainerPropsData } from './RouteContainer.container';
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core';

type RouteContainerProps = RouteContainerPropsData & {
  target: any;
  user: any;
  props: any;
  updateUserData(data: any): any;
  showNotification(message: string, timeout?: number): void;
};

export class RouteContainer extends Component<RouteContainerProps> {
  public componentDidUpdate(prevProps: RouteContainerProps) {
    const { updateUserData, showNotification, data } = this.props;

    if (!data.loading && prevProps.data.loading && data.user) {
      updateUserData(data.user);
      showNotification(`Welcome back ${data.user.nickname} 👋`);
    }
  }

  public render(): JSX.Element {
    const { target: Target, props, data } = this.props;

    if (data.loading) {
      return (
        <Paper className="paper" style={{ padding: '4em' }}>
          <Grid direction="column" alignItems="center" container>
            <CircularProgress style={{ marginBottom: '2em' }} />
            <Typography>Fetching user information...</Typography>
          </Grid>
        </Paper>
      );
    }

    return <Target {...props} />;
  }
}
