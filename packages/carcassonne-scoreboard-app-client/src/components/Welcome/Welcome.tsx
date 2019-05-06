import React, { PureComponent } from 'react';
import { QueryResult } from 'react-apollo';

import { Button, TextField, Paper, FormControl, CircularProgress } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';

import { WelcomeUserData } from './Welcome.container';
import { WelcomeStylesProps } from './WelcomeWithStyles';

interface UserQueryResult {
  user: WelcomeUserData;
}

export interface WelcomeProps extends WelcomeStylesProps {
  data: QueryResult & UserQueryResult;
  newGame(): void;
  joinGame(gameId: string): void;
}

interface WelcomeState {
  joinGameId: string;
  busy: boolean;
  joinGameFieldError: boolean;
  joinGameFieldPristine: boolean;
}

const initialState: WelcomeState = {
  joinGameId: '',
  busy: false,
  joinGameFieldError: false,
  joinGameFieldPristine: true,
};

export class WelcomeComponent extends PureComponent<WelcomeProps, WelcomeState> {
  public readonly state: WelcomeState = initialState;

  public render(): JSX.Element | null {
    const { joinGameId, busy, joinGameFieldError, joinGameFieldPristine } = this.state;
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
                <Grid direction="column" alignItems="center" container>
                  <CircularProgress style={{ marginBottom: '2em' }} />
                  <Typography>Preparing welcome screen...</Typography>
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
                    <Typography align="center" gutterBottom>
                      {user.victories
                        ? `You won ${user.victories} time${user.victories > 1 ? 's' : ''}`
                        : `You haven't won any game yet`}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <form className={classes.form} onSubmit={this.joinGame(joinGameId)}>
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
                        </FormControl>
                      </Grid>

                      <Grid container justify="center">
                        <FormControl>
                          <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
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
      joinGameFieldPristine: false,
    });
  };

  private newGame = () => {
    const { newGame } = this.props;

    newGame();
  };

  private joinGame = (id: string) => (event: React.FormEvent<HTMLFormElement>) => {
    const { joinGame } = this.props;
    const { joinGameFieldError, joinGameFieldPristine } = this.state;

    event.preventDefault();

    if (joinGameFieldError || joinGameFieldPristine) {
      return;
    }

    if (!id) {
      this.setState({
        joinGameFieldError: true,
      });

      return;
    }

    joinGame(id);
  };
}
