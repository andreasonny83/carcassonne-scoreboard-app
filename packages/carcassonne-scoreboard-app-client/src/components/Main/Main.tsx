import React, { PureComponent } from 'react';
import { Home } from '../Home';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AppContext, IAppContext } from '../PrivateRouter/app.context';

import './Main.css';

interface MainComponentProps {
  signOut(): void;
  showNotification(message: string, timeout?: number): void;
}

export class MainComponent extends PureComponent<MainComponentProps> {
  public static contextType: React.Context<IAppContext> = AppContext;
  public context!: React.ContextType<typeof AppContext>;

  public componentDidMount(): void {
    const { showNotification } = this.props;
    const { user } = this.context;

    showNotification(`Welcome back ${user.nickname}`);
  }

  public render(): JSX.Element {
    const { signOut } = this.props;

    return (
      <div className="MainComponent">
        <Header onSignOut={signOut} />
        <Home />
        <Footer />
      </div>
    );
  }
}
