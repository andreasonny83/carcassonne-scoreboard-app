import React, { PureComponent } from 'react';
import { Route } from 'react-router';
import { Home } from '../Home';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { IUser, UserContext } from '../PrivateRouter/user.context';

interface MainComponentProps {
  signOut(): void;
}

export class MainComponent extends PureComponent<MainComponentProps> {
  public static contextType: React.Context<IUser> = UserContext;

  public render(): JSX.Element {
    const { signOut } = this.props;
    const { username } = this.context as IUser;
    const appName: string = 'App name';

    return (
      <div className="MainComponent">
        <Header onSignOut={signOut} appName={appName} />
        <Route path="/" exact={true} render={_ => <Home userId={username} />} />
        <Footer />
      </div>
    );
  }
}
