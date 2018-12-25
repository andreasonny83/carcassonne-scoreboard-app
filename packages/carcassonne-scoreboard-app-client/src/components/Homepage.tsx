import React, { PureComponent } from 'react';

interface HomePageProps {
  signOut(): void;
}

export class HomePageComponent extends PureComponent<HomePageProps> {
  public render(): JSX.Element {
    const { signOut } = this.props;

    return (
      <div>
        <a onClick={signOut}>Sign Out</a>
        <h2>Home Page</h2>
      </div>
    );
  }
}
