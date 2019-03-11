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
  main: {
    width: 'auto',
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
    [breakpoints.up(500 + spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  mainFeaturedPost: {
    backgroundColor: palette.grey[100],
    color: palette.common.white,
    marginBottom: spacing.unit * 4,
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
        <Header appName={appName} />
        <main className={classes.main}>
          <Grid container justify="center">
            <Grid item xs={12}>
              {routes()}
            </Grid>
          </Grid>
        </main>
        <Footer />
        <Snackbar />
      </div>
    );
  }
}

export const AppComponent = withRouter(withStyles(styles)(AppWrapperComponent));
