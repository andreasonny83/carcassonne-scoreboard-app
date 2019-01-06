import React, { PureComponent } from 'react';
import { UserContext, IUser } from '../PrivateRouter/user.context';

interface HeaderProps {
  appName: string;
  onSignOut(): void;
}

export class Header extends PureComponent<HeaderProps> {
  public static contextType: React.Context<IUser> = UserContext;

  public render(): JSX.Element {
    const { appName, onSignOut } = this.props;
    const { nickname } = this.context as IUser;

    return (
      <div className="Header">
        <h1>{appName}</h1>
        <span>{nickname}</span>
        <a onClick={onSignOut}>Sign Out</a>
      </div>
    );
  }
}
