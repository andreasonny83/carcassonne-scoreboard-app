import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router';

import { Welcome } from '../Welcome';
import { NewGame } from '../NewGame';
import { Game } from '../Game';
import { UserProfile } from '../User';
import { Games } from '../Games';

type MainComponentProps = RouteComponentProps;;

export class MainComponent extends PureComponent<MainComponentProps> {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route path={`/app`} exact={true} component={Welcome} />
        <Route path={`/app/game/new`} component={NewGame} />
        <Route path={`/app/game/:gameId`} component={Game} />
        <Route path={`/app/user/profile`} component={UserProfile} />
        <Route path={`/app/user/games`} component={Games} />
        <Redirect to={'/404'} />
      </Switch>
    );
  }
}
