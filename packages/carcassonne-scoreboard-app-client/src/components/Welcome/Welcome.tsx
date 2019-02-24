import React, { PureComponent } from 'react';

import { UserData } from '../Home';
import { ChildProps } from 'react-apollo';
import { NewGameResponse } from './Welcome.container';

export interface WelcomeProps {
  user: UserData;
  newGameMutation(): Promise<any>;
  joinGameMutation(options: any): Promise<any>;
  newGame(gameId: string): void;
  joinGame(gameId: string): void;
  showNotification(message: string, timeout?: number): void;
}

interface WelcomeState {
  joinGameId: string;
  loading: boolean;
  joinGameError: boolean;
}

const initialState: WelcomeState = {
  joinGameId: '',
  loading: false,
  joinGameError: false,
};

export class WelcomeComponent extends PureComponent<
  ChildProps<WelcomeProps, NewGameResponse>,
  WelcomeState
> {
  public readonly state: WelcomeState = initialState;

  public render(): JSX.Element | null {
    const { user } = this.props;
    const { joinGameId, loading, joinGameError } = this.state;

    if (!user) {
      return null;
    }

    const { name, games = 0 } = user;

    return (
      <div className="Welcome">
        <h2>Welcome back {name}</h2>
        <span>
          You have played {games} {games === 1 ? 'game' : 'games'} so far
        </span>
        <div className="row">
          <div className="row">Start a new Game</div>
          <button className="newGame" onClick={this.newGame}>
            New Game
          </button>
        </div>

        <div className="row">Join a Game</div>
        <div className="row">
          <label>
            Game name
            <input
              name="joinGameId"
              type="text"
              className="joinGameId"
              disabled={loading}
              value={joinGameId}
              onChange={this.updateJoinGameName}
              required={true}
              min={10}
            />
          </label>
          {joinGameError && <div className="joinGameError">The game you entered is not valid</div>}
        </div>
        <div className="row">
          <button className="joinGame" onClick={this.joinGame(joinGameId)}>
            Join
          </button>
        </div>
      </div>
    );
  }

  private updateJoinGameName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const value: string = target && target.value;

    event.preventDefault();

    this.setState({
      joinGameId: value,
      joinGameError: false,
    });
  };

  private newGame = () => {
    const { newGameMutation, newGame } = this.props;

    newGameMutation().then(({ data }: any) => {
      const id = data && data.newGame && data.newGame.id;
      newGame(id);
    });
  };

  private joinGame = (id: string) => () => {
    const { joinGameMutation, joinGame, showNotification } = this.props;

    this.setState({
      loading: true,
    });

    joinGameMutation({
      variables: { gameId: id },
    })
      .finally(() => {
        this.setState({
          loading: false,
        });
      })
      .then(({ data }: any) => {
        const gameId = data && data.joinGame && data.joinGame.id;

        joinGame(gameId);
      })
      .catch(() => {
        this.setState({
          joinGameError: true,
          joinGameId: '',
        });

        showNotification(`Error. No game named ${id} has been found.`);
      });
  };
}
