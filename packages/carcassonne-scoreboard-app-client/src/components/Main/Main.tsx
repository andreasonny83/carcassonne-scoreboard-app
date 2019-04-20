import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router';

import { Welcome } from '../Welcome';
import { NewGame } from '../NewGame';
import { Game } from '../Game';
import { UserProfile } from '../User';

import { AppContext, IAppContext } from '../PrivateRouter/app.context';

interface MainComponentProps extends RouteComponentProps {
  showNotification(message: string, timeout?: number): void;
}

export class MainComponent extends PureComponent<MainComponentProps> {
  public static contextType: React.Context<IAppContext> = AppContext;
  public context!: React.ContextType<typeof AppContext>;

  public componentDidMount(): void {
    const { showNotification } = this.props;
    const { user } = this.context;

    showNotification(`Welcome back ${user.nickname} 👋`);
  }

  public render(): JSX.Element {
    return (
      <Switch>
        <Route path={`/app`} exact={true} component={Welcome} />
        <Route path={`/app/game/new`} component={NewGame} />
        <Route path={`/app/game/:gameId`} component={Game} />
        <Route path={`/app/user/profile`} component={UserProfile} />
        <Redirect to={'/404'} />
      </Switch>
    );
  }
}
