import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { Welcome } from '../Welcome';
import { QueryResult } from 'react-apollo';
import { UserData } from './Home.container';
import { NewGame } from '../NewGame';
import { UserProfile } from '../User';

import './Home.css';

interface UserQueryResult {
  user: UserData;
}

export interface HomeComponentProps {
  data: QueryResult & UserQueryResult;
}

export class HomeComponent extends PureComponent<HomeComponentProps, {}> {
  public render(): JSX.Element {
    const { loading, error, user } = this.props.data;

    return (
      <div className="Home container">
        {error ? (
          <div>
            <h2>Something went wrong</h2>
            <p>Please check your Internet connection and try again later</p>
          </div>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <Switch>
            <Route path={`/app`} exact={true} render={_ => <Welcome user={user} />} />
            <Route path={`/app/game/:gameId/new`} component={NewGame} />
            <Route path={`/app/game/:gameId`} component={NewGame} />
            <Route path={`/app/user/profile`} component={UserProfile} />
            <Redirect to={'/404'} />
          </Switch>
        )}
      </div>
    );
  }
}
