import React, { PureComponent } from 'react';
import { QueryResult, ChildProps } from 'react-apollo';

import { Button, TextField, Paper, FormControl, CircularProgress } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';

import { UserData, JoinGameResponse } from './Welcome.container';
import { WelcomeStylesProps } from './WelcomeWithStyles';

interface UserQueryResult {
  user: UserData;
}

export interface WelcomeProps extends WelcomeStylesProps {
  data: QueryResult & UserQueryResult;
  joinGameMutation(options: any): Promise<any>;
  newGame(): void;
  joinGame(gameId: string): void;
  showNotification(message: string, timeout?: number): void;
}

interface WelcomeState {
  joinGameId: string;
  busy: boolean;
  joinGameError: boolean;
  joinGameFieldError: boolean;
  joinGameFieldPristine: boolean;
}

const initialState: WelcomeState = {
  joinGameId: '',
  busy: false,
  joinGameError: false,
  joinGameFieldError: false,
  joinGameFieldPristine: true,
};

export class WelcomeComponent extends PureComponent<
  ChildProps<WelcomeProps, JoinGameResponse>,
  WelcomeState
> {
  public readonly state: WelcomeState = initialState;

  public render(): JSX.Element | null {
    const {
      joinGameId,
      busy,
      joinGameError,
      joinGameFieldError,
      joinGameFieldPristine,
    } = this.state;
    const { classes } = this.props;
    const { loading, error, user } = this.props.data;
    const userGames = (user && user.games && user.games.length) || 0;

    return (
      <Paper className={classes.mainFeaturedPost} elevation={1}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.mainFeaturedPostContent}>
              {error ? (
                <div>
                  <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    gutterBottom
                  >
                    Something went wrong
                  </Typography>
                  <Typography variant="h5" color="inherit" align="center" paragraph>
                    Please check your Internet connection and try again later
                  </Typography>
                </div>
              ) : loading ? (
                <Grid direction="column" alignContent="center" container>
                  <CircularProgress />
                </Grid>
              ) : (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      component="h2"
                      variant="h5"
                      color="inherit"
                      align="center"
                      gutterBottom
                    >
                      Welcome back
                    </Typography>

                    <Typography align="center" gutterBottom>
                      You have played {userGames} {userGames === 1 ? 'game' : 'games'} so far
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <form className={classes.form}>
                      <Grid container justify="center">
                        <FormControl>
                          <Button variant="outlined" color="primary" onClick={this.newGame}>
                            Start a new game
                          </Button>
                        </FormControl>
                      </Grid>

                      <Grid container className={classes.joinGame}>
                        <FormControl fullWidth={true} error={joinGameFieldError}>
                          <Typography align="center" gutterBottom>
                            Join a Game
                          </Typography>
                          <TextField
                            name="joinGameId"
                            type="text"
                            variant="outlined"
                            className="joinGameId"
                            disabled={busy}
                            error={joinGameFieldError}
                            value={joinGameId}
                            onChange={this.updateJoinGameName}
                            label="Game name"
                          />
                          {joinGameError && (
                            <Typography>The game you entered is not valid</Typography>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid container justify="center">
                        <FormControl>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.joinGame(joinGameId)}
                            disabled={joinGameFieldError || joinGameFieldPristine}
                          >
                            Join
                          </Button>
                        </FormControl>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              )}
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  private updateJoinGameName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const value: string = target && target.value;

    event.preventDefault();

    const joinGameFieldError = !(value && value.length > 8);

    this.setState({
      joinGameFieldError,
      joinGameId: value,
      joinGameError: false,
      joinGameFieldPristine: false,
    });
  };

  private newGame = () => {
    const { newGame } = this.props;

    newGame();
  };

  private joinGame = (id: string) => () => {
    const { joinGameMutation, joinGame, showNotification } = this.props;

    if (!id) {
      this.setState({
        joinGameFieldError: true,
      });
      return;
    }

    this.setState({
      busy: true,
    });

    joinGameMutation({
      variables: {
        joinGameInput: {
          gameId: id,
        },
      },
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
