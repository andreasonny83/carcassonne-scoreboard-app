import React, { PureComponent } from 'react';

interface GameComponentProps {
  data?: any;
}

export class GameComponent extends PureComponent<GameComponentProps> {
  public render() {
    const { data } = this.props;

    if (data.error) {
      const graphQLError = data.error.graphQLErrors && data.error.graphQLErrors[0];

      return (
        <div className="NewGame">
          <h3>Error</h3>
          <p>{graphQLError.message}</p>
        </div>
      );
    }

    return (
      <div className="NewGame">
        <h2>Game</h2>
        <p>Game id: {data.game && data.game.id}</p>
      </div>
    );
  }
}
