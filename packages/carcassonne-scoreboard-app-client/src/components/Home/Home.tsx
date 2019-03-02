import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router';

import { Welcome } from '../Welcome';
import { NewGame } from '../NewGame';
import { Game } from '../Game';
import { UserProfile } from '../User';

import './Home.css';

export class HomeComponent extends PureComponent<RouteComponentProps> {
  public render(): JSX.Element {
    return (
      <div className="Home container">
        <Switch>
          <Route path={`/app`} exact={true} component={Welcome} />
          <Route path={`/app/game/new`} component={NewGame} />
          <Route path={`/app/game/:gameId`} component={Game} />
          <Route path={`/app/user/profile`} component={UserProfile} />
          <Redirect to={'/404'} />
        </Switch>
      </div>
    );
  }
}

export const Home = withRouter(HomeComponent);
