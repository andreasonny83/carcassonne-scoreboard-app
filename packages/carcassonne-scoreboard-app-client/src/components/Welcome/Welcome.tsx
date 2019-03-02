import React, { PureComponent } from 'react';
import { QueryResult } from 'react-apollo';
import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@material-ui/styles';
import { Link, Button, TextField } from '@material-ui/core';

import { AppContext, IAppContext } from '../PrivateRouter/app.context';
import { UserData } from './Welcome.container';
import { ChildProps } from 'react-apollo';
import { NewGameResponse } from './Welcome.container';

const StyledLink = styled(RouterLink)({
  color: 'inherit',
});

const ButtonLink = (props: any) => (
  <Button variant="outlined" color="primary" {...props}>
    <StyledLink to={'/app/game/new'} {...props} />
  </Button>
);

interface UserQueryResult {
  user: UserData;
}

export interface WelcomeProps {
  data: QueryResult & UserQueryResult;
  newGameMutation(): Promise<any>;
  joinGameMutation(options: any): Promise<any>;
  newGame(gameId: string): void;
  joinGame(gameId: string): void;
  showNotification(message: string, timeout?: number): void;
}

interface WelcomeState {
  joinGameId: string;
  busy: boolean;
  joinGameError: boolean;
}

const initialState: WelcomeState = {
  joinGameId: '',
  busy: false,
  joinGameError: false,
};

export class WelcomeComponent extends PureComponent<
  ChildProps<WelcomeProps, NewGameResponse>,
  WelcomeState
> {
  public static contextType: React.Context<IAppContext> = AppContext;
  public context!: React.ContextType<typeof AppContext>;
  public readonly state: WelcomeState = initialState;

  public render(): JSX.Element | null {
    const { user: userContext } = this.context;
    const { loading, error, user } = this.props.data;
    const { joinGameId, busy, joinGameError } = this.state;
    const userGames = (user && user.games && user.games.length) || 0;

    if (!user) {
      console.warn('no user found');
    }

    return (
      <div className="Welcome">
        {error ? (
          <div>
            <h2>Something went wrong</h2>
            <p>Please check your Internet connection and try again later</p>
          </div>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>Welcome back {userContext.nickname}</h2>
            <span>
              You have played {userGames} {userGames === 1 ? 'game' : 'games'} so far
            </span>
            <div className="row">
              <Link component={ButtonLink} underline="none">
                Start a new game
              </Link>
            </div>

            <div className="row">Join a Game</div>
            <div className="row">
              <TextField
                name="joinGameId"
                type="text"
                variant="outlined"
                className="joinGameId"
                disabled={busy}
                value={joinGameId}
                onChange={this.updateJoinGameName}
                label="Game name"
              />
              {joinGameError && (
                <div className="joinGameError">The game you entered is not valid</div>
              )}
            </div>
            <div className="row">
              <Button variant="outlined" color="primary" onClick={this.joinGame(joinGameId)}>
                Join game
              </Button>
            </div>
          </>
        )}
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

  // private newGame = () => {
  //   const { newGameMutation, newGame } = this.props;

  //   newGameMutation().then(({ data }: any) => {
  //     const id = data && data.newGame && data.newGame.id;
  //     newGame(id);
  //   });
  // };

  private joinGame = (id: string) => () => {
    const { joinGameMutation, joinGame, showNotification } = this.props;

    this.setState({
      busy: true,
    });

    joinGameMutation({
      variables: { gameId: id },
    })
      .finally(() => {
        this.setState({
          busy: false,
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
