import React, { PureComponent } from 'react';
import {
  Paper,
  Typography,
  OutlinedInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { v4 } from 'uuid';
import get from 'lodash/get';

import { NewGameStylesProps } from './NewGameWithStyles';
import { MeepleColor } from '../Icons';
import { NewPlayer } from './NewPlayer';
import { NewGamePlayer, ChildPropsData } from './NewGame.container';
import { formatErrorAndLog } from '../../utils/formatErrors';

interface NewGameMutationInput {
  variables: {
    newGameInput: {
      name: string;
      players: string;
    };
  };
}

type NewGameProps = NewGameStylesProps &
  ChildPropsData & {
    width: Breakpoint;
    newGame(props: NewGameMutationInput): Promise<any>;
    showNotification(message: string): void;
    joinGame(gameId: string): void;
    go(path: string): void;
  };

interface NewGameState {
  busy: boolean;
  pristine: boolean;
  gameNameValid: boolean;
  gameName: string;
  players: NewGamePlayer[];
}

const initialPlayers: NewGamePlayer[] = [
  {
    name: '',
    color: 'green',
    key: v4(),
  },
];

const initialState: NewGameState = {
  busy: false,
  pristine: true,
  gameNameValid: false,
  gameName: '',
  players: initialPlayers,
};

export class NewGame extends PureComponent<NewGameProps, NewGameState> {
  public readonly state = initialState;

  public render() {
    const { width, classes } = this.props;
    const { gameName, pristine, gameNameValid, players, busy } = this.state;
    const isMobile = !isWidthUp('sm', width);

    if (busy) {
      return (
        <Paper elevation={isMobile ? 0 : 1} square={isMobile} className={classes.root}>
          <Grid direction="column" alignContent="center" container>
            <CircularProgress />
          </Grid>
        </Paper>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <Paper elevation={isMobile ? 0 : 1} square={isMobile} className={classes.root}>
          <Grid container className={classes.goBack}>
            <Button variant="outlined" color="secondary" onClick={this.goBack}>
              Go Back
            </Button>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography component="h2" variant="h5" color="inherit" align="center" gutterBottom>
                Prepare the Game
              </Typography>
            </Grid>
          </Grid>

          <Grid container className={classes.container}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              error={!pristine && !gameNameValid}
              disabled={busy}
              required
              fullWidth
            >
              <InputLabel htmlFor="gameName" variant="outlined">
                Game name
              </InputLabel>
              <OutlinedInput
                id="gameName"
                name="gameName"
                autoComplete="gameName"
                type="string"
                value={gameName}
                className={classes.gameName}
                onChange={this.handleChange}
                labelWidth={110}
              />
              <FormHelperText hidden={pristine} className={classes.gameNameDescription}>
                Enter a valid game name (7 letters minimum).
              </FormHelperText>
            </FormControl>

            <NewPlayer
              player={players[0]}
              busy={busy}
              placeholder="Your player name"
              labelWidth={160}
              hideDelete={true}
              onRemovePlayer={this.removePlayer}
              onChange={this.handleChange}
            />
          </Grid>
        </Paper>

        <Paper elevation={1} className={classes.root}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography component="h2" variant="h6" color="inherit" align="center" gutterBottom>
                Opponent players
              </Typography>
            </Grid>

            <Grid container>
              {players.slice(1).map((player: NewGamePlayer) => (
                <NewPlayer
                  key={player.key}
                  player={player}
                  busy={busy}
                  placeholder="Player name"
                  labelWidth={120}
                  onRemovePlayer={this.removePlayer}
                  onChange={this.handleChange}
                />
              ))}

              <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.addPlayer}
                  disabled={busy || players.length >= 6}
                >
                  Add Player
                </Button>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  disabled={busy || !gameNameValid || players.length < 2}
                >
                  Go to the Game
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }

  private goBack = () => {
    const { go } = this.props;

    go('/app');
  };

  private handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    player?: NewGamePlayer,
    playerField?: string
  ): void => {
    const target = event && event.target;
    const name: string = target && target.name;
    const value: string = target && target.value;
    let isGameNameValid: boolean;
    let newPlayers: NewGamePlayer[];

    event.preventDefault();

    if (name === 'gameName') {
      const re: RegExp = /^\w[\w\s]{6,}$/;
      isGameNameValid = re.test(String(value));
    }

    if (player) {
      const { players } = this.state;

      newPlayers = players.map(
        currPlayer =>
          (currPlayer.key === player.key && {
            ...currPlayer,
            ...(playerField === 'color' && { color: value as MeepleColor }),
            ...(playerField === 'name' && { name: value }),
          }) ||
          currPlayer
      );
    }

    this.setState(
      (prevState: NewGameState): NewGameState => ({
        ...prevState,
        ...(name === 'gameName' && { gameNameValid: isGameNameValid }),
        ...(Boolean(player) && { players: newPlayers }),
        ...(!player && { [name]: value }),
        pristine: false,
      })
    );
  };

  private removePlayer = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    selectedPlayer: NewGamePlayer
  ) => {
    const { players } = this.state;

    const newPlayers = players.filter(currPlayer => currPlayer.key !== selectedPlayer.key);

    this.setState({
      players: [...newPlayers],
    });
  };

  private addPlayer = () => {
    const { players } = this.state;

    const newPlayer: NewGamePlayer = {
      name: '',
      color: 'blue',
      key: v4(),
    };

    this.setState({
      players: [...players, newPlayer],
    });
  };

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { showNotification, joinGame, newGame } = this.props;
    const { players, gameName } = this.state;

    event.preventDefault();

    const playersColors = players.map((player: NewGamePlayer) => player.color);

    const isGameReady = playersColors.every(
      (item: any, index: number) => playersColors.indexOf(item) === index
    );

    if (!isGameReady) {
      showNotification(
        'You cannot have more players with the same color. Please check your game and try again.'
      );

      return;
    }

    const gamePlayers = players.map(player => ({ color: player.color, name: player.name }));
    let newGameRes;

    this.setState({
      busy: true,
    });

    try {
      newGameRes = await newGame({
        variables: {
          newGameInput: {
            name: gameName,
            players: gamePlayers,
          },
        },
      });
    } catch (err) {
      showNotification(`⛔️ ${formatErrorAndLog(err).message}`);
      this.setState({
        busy: false,
      });

      return;
    }

    const gameId = get(newGameRes, 'data.newGame.id');

    joinGame(gameId);
  };
}
