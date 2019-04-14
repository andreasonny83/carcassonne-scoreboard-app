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
} from '@material-ui/core';

import { NewGameStylesProps } from './NewGameWithStyles';
import { MeepleColor } from '../Icons';
import { NewPlayer } from '../NewPlayer';
import { IPlayer } from './NewGame.container';

interface NewGameComponentProps extends NewGameStylesProps {
  showNotification(message: string): void;
  newGame(options: any): Promise<any>;
  joinGame(gameId: string): void;
}

const initialPlayers: IPlayer[] = [
  { key: 'player1', name: '', color: 'green', active: true },
  { key: 'player2', name: '', color: 'red', active: false },
  { key: 'player3', name: '', color: 'yellow', active: false },
  { key: 'player4', name: '', color: 'blue', active: false },
  { key: 'player5', name: '', color: 'black', active: false },
  { key: 'player6', name: '', color: 'gray', active: false },
];

const initialState = {
  busy: false,
  pristine: true,
  gameNameValid: false,
  gameName: '',
  players: initialPlayers,
};

type NewGameState = Readonly<typeof initialState>;

export class NewGameComponent extends PureComponent<NewGameComponentProps, NewGameState> {
  public readonly state = initialState;

  public render() {
    const { classes } = this.props;
    const { gameName, pristine, gameNameValid, players, busy } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Paper elevation={1} className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="h2" variant="h5" color="inherit" align="center" gutterBottom>
                Prepare the Game
              </Typography>
            </Grid>

            <div className={classes.form}>
              <FormControl
                margin="normal"
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
                  autoFocus
                />
                <FormHelperText hidden={pristine} className={classes.gameNameDescription}>
                  Enter a valid game name. Only letters, numbers and underscore allowed.
                </FormHelperText>
              </FormControl>

              <NewPlayer
                key={players[0].key}
                player={players[0]}
                busy={busy}
                placeholder="Your player name"
                labelWidth={160}
                hideDelete={true}
                onRemovePlayer={this.removePlayer}
                onChange={this.handleChange}
              />
            </div>
          </Grid>
        </Paper>

        <Paper elevation={1} className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="h2" variant="h6" color="inherit" align="center" gutterBottom>
                Opponent players
              </Typography>
            </Grid>

            <div className={classes.form}>
              {players
                .filter((player, index) => index && player.active)
                .map((player: IPlayer) => (
                  <NewPlayer
                    key={player.key}
                    player={player}
                    busy={busy}
                    autoFocus={true}
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
                  disabled={busy || players.filter(player => player.active).length >= 6}
                >
                  Add Player
                </Button>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  disabled={
                    busy || !gameNameValid || players.filter(player => player.active).length < 2
                  }
                >
                  Go to the Game
                </Button>
              </FormControl>
            </div>
          </Grid>
        </Paper>
      </form>
    );
  }

  private handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    player?: IPlayer,
    playerField?: string
  ): void => {
    const target = event && event.target;
    const name: string = target && target.name;
    const value: string = target && target.value;
    let isGameNameValid: boolean;
    let newPlayers: IPlayer[];

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
    selectedPlayer: IPlayer
  ) => {
    const { players } = this.state;

    const newPlayers = players.map(currPlayer => {
      if (currPlayer.key === selectedPlayer.key) {
        return {
          ...currPlayer,
          active: false,
        };
      }

      return currPlayer;
    });

    this.setState({
      players: [...newPlayers],
    });
  };

  private addPlayer = () => {
    const { players } = this.state;
    const newPlayerIndex = players.findIndex(player => !player.active);

    if (newPlayerIndex < 0) {
      return;
    }

    const newPlayers = players.map(player => {
      if (player.key === players[newPlayerIndex].key) {
        return {
          ...player,
          active: true,
        };
      }

      return player;
    });

    this.setState({
      players: [...newPlayers],
    });
  };

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { showNotification, newGame, joinGame } = this.props;
    const { players, gameName } = this.state;

    event.preventDefault();

    const playersColors = players
      .filter((player: IPlayer) => player.active)
      .map((player: IPlayer) => player.color);
    const isGameReady = playersColors.every(
      (item: any, index: number) => playersColors.indexOf(item) === index
    );
    const activePlayers = players
      .filter((player: IPlayer) => player.active)
      .map((player: IPlayer) => ({
        name: player.name,
        color: player.color,
        key: player.key,
      }));

    if (isGameReady) {
      newGame({
        variables: {
          newGameInput: {
            name: gameName,
            players: activePlayers,
          },
        },
      }).then(({ data }: any) => {
        const gameId: string = data.newGame && data.newGame.id;
        joinGame(gameId);
      });

      this.setState({
        busy: true,
      });

      return;
    }

    showNotification(
      'You cannot have more players with the same color. Please check your game and try again.'
    );
  };
}
