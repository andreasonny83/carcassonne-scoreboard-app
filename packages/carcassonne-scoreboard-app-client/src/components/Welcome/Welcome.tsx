import React, { PureComponent } from 'react';
import { QueryResult } from 'react-apollo';
import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@material-ui/styles';
import { Link, Button, TextField, Paper, FormControl } from '@material-ui/core';
import { withStyles, WithStyles, Theme, Grid, Typography } from '@material-ui/core';
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth';

import { AppContext, IAppContext } from '../PrivateRouter/app.context';
import { UserData } from './Welcome.container';
import { ChildProps } from 'react-apollo';
import { NewGameResponse } from './Welcome.container';

const styles = ({ spacing }: Theme) => ({
  mainFeaturedPost: {
    marginBottom: spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${spacing.unit * 6}px`,
  },
  row: {
    marginBottom: '1rem',
  },
  form: {
    maxWidth: '500px',
    marginTop: '2em',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em 0.5em',
  },
  joinGame: {
    marginTop: '3em',
    marginBottom: '0.75em',
  },
});

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

export interface WelcomeProps extends WithStyles<typeof styles>, WithWidth {
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

class Welcome extends PureComponent<ChildProps<WelcomeProps, NewGameResponse>, WelcomeState> {
  public static contextType: React.Context<IAppContext> = AppContext;
  public context!: React.ContextType<typeof AppContext>;
  public readonly state: WelcomeState = initialState;

  public render(): JSX.Element | null {
    const {
      joinGameId,
      busy,
      joinGameError,
      joinGameFieldError,
      joinGameFieldPristine,
    } = this.state;
    const { classes, width } = this.props;
    const { user: userContext } = this.context;
    const { loading, error, user } = this.props.data;
    const userGames = (user && user.games && user.games.length) || 0;

    if (!user) {
      console.warn('no user found');
    }

    return (
      <Paper className={classes.mainFeaturedPost} elevation={1}>
        <Grid container>
          <Grid item md={12}>
            <div className={classes.mainFeaturedPostContent}>
              {error ? (
                <div>
                  <Typography
                    component="h1"
                    variant="h2"
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
                <Typography variant="h5" color="inherit" align="center" paragraph>
                  Loading...
                </Typography>
              ) : (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      align="center"
                      gutterBottom
                    >
                      Welcome back {userContext.nickname}
                    </Typography>

                    <Typography align="center" gutterBottom>
                      You have played {userGames} {userGames === 1 ? 'game' : 'games'} so far
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <form className={classes.form}>
                      <Grid container justify="center">
                        <FormControl>
                          <Link gutterBottom component={ButtonLink} underline="none">
                            Start a new game
                          </Link>
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

  // private newGame = () => {
  //   const { newGameMutation, newGame } = this.props;

  //   newGameMutation().then(({ data }: any) => {
  //     const id = data && data.newGame && data.newGame.id;
  //     newGame(id);
  //   });
  // };

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

export const WelcomeComponent = withStyles(styles)(withWidth()(Welcome));
