import React, { PureComponent } from 'react';
import { Home } from '../Home';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { IUser, UserContext } from '../PrivateRouter/user.context';

import './Main.css';

interface MainComponentProps {
  signOut(): void;
  showNotification(message: string, timeout?: number): void;
}

export class MainComponent extends PureComponent<MainComponentProps> {
  public static contextType: React.Context<IUser> = UserContext;
  public context!: React.ContextType<typeof UserContext>;

  public componentDidMount(): void {
    const { showNotification } = this.props;
    const { nickname } = this.context;

    showNotification(`Welcome back ${nickname}`);
  }

  public render(): JSX.Element {
    const { signOut } = this.props;
    const { username } = this.context as IUser;
    const appName: string = 'App name';

    return (
      <div className="MainComponent">
        <Header onSignOut={signOut} appName={appName} />
        <Home userId={username} />
        <Footer />
      </div>
    );
  }
}
