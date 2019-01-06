import React, { PureComponent } from 'react';
import { Route } from 'react-router';
import { Welcome } from '../Welcome';
import { QueryResult } from 'react-apollo';
import { UserData } from './Home.container';

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
      <div className="Home">
        <h2>Home</h2>

        {loading && <div>Loading...</div>}
        {(error && <div>Something went wrong. Please try again later.</div>) || (
          <Route path={`/`} render={_ => <Welcome user={user} />} />
        )}
      </div>
    );
  }
}
