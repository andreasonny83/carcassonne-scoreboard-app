import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { withStyles, WithStyles, Theme, Grid } from '@material-ui/core';

import { routes } from '../../routes';
import { Snackbar } from '../Snackbar';
import { Header } from '../Header';
import { Footer } from '../Footer';

const styles = ({ breakpoints, spacing, palette }: Theme) => ({
  layout: {
    width: 'auto',
    margin: 0,
  },
  grid: {
    minHeight: '100vh',
    marginBottom: 0,
  },
  main: {
    flex: '1 1 auto',
    width: 'auto',
    marginLeft: spacing.unit * 2,
    marginRight: spacing.unit * 2,
    [breakpoints.up(1100 + spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  mainFeaturedPost: {
    backgroundColor: palette.grey[100],
    color: palette.common.white,
    marginBottom: spacing.unit * 4,
  },
  footer: {
    paddingBottom: 0,
  },
});

interface AppWrapperComponentProps extends WithStyles<typeof styles> {
  appName: string;
}

export class AppWrapperComponent extends PureComponent<
  AppWrapperComponentProps & RouteComponentProps
> {
  public render(): JSX.Element {
    const { appName, classes } = this.props;

    return (
      <div className={classes.layout}>
        <Grid
          className={classes.grid}
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          wrap="nowrap"
        >
          <Header appName={appName} />
          <main className={classes.main}>{routes()}</main>
          <Grid item className={classes.footer}>
            <Footer />
          </Grid>
        </Grid>
        <Snackbar />
      </div>
    );
  }
}

export const AppComponent = withRouter(withStyles(styles)(AppWrapperComponent));
