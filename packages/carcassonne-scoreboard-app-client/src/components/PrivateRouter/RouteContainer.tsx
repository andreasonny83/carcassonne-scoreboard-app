import React, { Component } from 'react';
import { RouteContainerPropsData } from './RouteContainer.container';
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

type RouteContainerProps = RouteContainerPropsData & {
  width: Breakpoint;
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
    const { target: Target, props, width, data } = this.props;
    const isMobile = !isWidthUp('sm', width);

    if (data.loading) {
      return (
        <Paper
          elevation={isMobile ? 0 : 1}
          square={isMobile}
          className="paper"
          style={{ padding: '4em' }}
        >
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
