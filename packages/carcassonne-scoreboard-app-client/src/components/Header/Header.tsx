import React, { PureComponent } from 'react';
import { UserContext, IUser } from '../PrivateRouter/user.context';
import { Link } from 'react-router-dom';

import './Header.css';

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
      <div className="Header container">
        <h1>
          <Link to="/" className="appName">
            {appName}
          </Link>
        </h1>
        <nav role="navigation" className="Header__userMenu">
          <div className="Header__userMenu__menu">{nickname}</div>
          <ul className="Header__dropdown">
            <li>
              <Link to="/app/user/profile">Profile</Link>
            </li>
            <li>
              <a onClick={onSignOut}>Sign Out</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
