import React, { PureComponent } from 'react';

interface NewGameComponentProps {
  data?: any;
}

export class NewGameComponent extends PureComponent<NewGameComponentProps> {
  public render() {
    const { data } = this.props;
    console.log(data);

    if (data.error) {
      return (
        <div className="NewGame">
          <h3>Cannot find the current gameID in the database.</h3>
          <p>Please try again later.</p>
        </div>
      );
    }

    if (data.game && data.game.started) {
      return (
        <div className="NewGame">
          <h3>Cannot start a new game with this ID</h3>
          <p>Another game with the same name is already present in our databases.</p>
          <p>Please go back and generate a new game.</p>
        </div>
      );
    }

    return (
      <div className="NewGame">
        <h2>new game</h2>
        <p>Game id: {data.game && data.game.id}</p>
      </div>
    );
  }
}
