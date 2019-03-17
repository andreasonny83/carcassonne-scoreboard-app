import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { Grid } from '@material-ui/core';

import { routes } from '../../routes';
import { Snackbar } from '../Snackbar';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AppWithStylesProps } from './AppWithStyles';

interface AppWrapperComponentProps extends AppWithStylesProps {
  appName: string;
}

export class AppComponent extends PureComponent<
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
