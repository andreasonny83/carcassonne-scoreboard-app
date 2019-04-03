import React, { PureComponent } from 'react';
import {
  Paper,
  Typography,
  OutlinedInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  Button,
  Fab,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { NewGameStylesProps } from './NewGameWithStyles';
import { Meeple } from '../Icons';

const mapColor = new Map([
  ['green', '#689f38'],
  ['red', '#d32f2f'],
  ['blue', '#1e88e5'],
  ['yellow', '#fdd835'],
  ['black', '#263238'],
  ['gray', '#9e9e9e'],
]);

interface NewGameComponentProps extends NewGameStylesProps {
  showNotification(message: string): void;
  newGame(options: any): Promise<any>;
}

type MeepleColor = 'green' | 'red' | 'blue' | 'yellow' | 'black' | 'gray';

interface IPlayer {
  key: string;
  name: string;
  color: MeepleColor;
  active: boolean;
}

const initialPlayers: IPlayer[] = [
  { key: 'player1', name: '', color: 'green', active: false },
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
      <Paper elevation={1} className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Typography component="h2" variant="h5" color="inherit" align="center" gutterBottom>
              New Game
            </Typography>
          </Grid>

          <form onSubmit={this.handleSubmit} className={classes.form}>
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
                onChange={this.handleChange}
                labelWidth={110}
                autoFocus
              />
              <FormHelperText hidden={pristine}>
                Enter a valid game name. Only letters, numbers and underscore allowed.
              </FormHelperText>
            </FormControl>

            {players
              .filter(player => player.active)
              .map((player: IPlayer) => (
                <div key={player.key}>
                  <Grid container spacing={16} direction="row" alignItems="center" justify="center">
                    <Grid item xs={1} className={classes.deleteContainer}>
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Delete"
                        onClick={event => this.removePlayer(event, player)}
                        disabled={busy}
                        classes={{
                          primary: classes.deleteButton,
                        }}
                      >
                        <Delete fontSize="small" />
                      </Fab>
                    </Grid>
                    <Grid item xs={11}>
                      <FormControl
                        margin="normal"
                        variant="outlined"
                        className={classes.formControl}
                        disabled={busy}
                        required
                        fullWidth
                      >
                        <InputLabel htmlFor={`${player.key}-name`} variant="outlined">
                          Player Name
                        </InputLabel>
                        <OutlinedInput
                          id={`${player.key}-name`}
                          name={`${player.key}-name`}
                          value={`${player.name}`}
                          onChange={event => this.handleChange(event, player, 'name')}
                          type="string"
                          placeholder="Player Name"
                          labelWidth={120}
                          autoFocus
                        />
                      </FormControl>

                      <FormControl
                        variant="outlined"
                        className={classes.formPlayerControl}
                        disabled={busy}
                        fullWidth
                      >
                        <InputLabel htmlFor={`${player.key}-color`}>Color</InputLabel>
                        <Select
                          value={player.color}
                          onChange={event => this.handleChange(event, player, 'color')}
                          className={classes.playerSelect}
                          input={
                            <OutlinedInput
                              labelWidth={50}
                              name={`${player.key}-color`}
                              id={`${player.key}-color`}
                            />
                          }
                        >
                          <MenuItem value="green">Green</MenuItem>
                          <MenuItem value="red">Red</MenuItem>
                          <MenuItem value="blue">Blue</MenuItem>
                          <MenuItem value="yellow">Yellow</MenuItem>
                          <MenuItem value="black">Black</MenuItem>
                          <MenuItem value="gray">Gray</MenuItem>
                        </Select>
                        <Meeple
                          className={classes.meeple}
                          fontSize="3em"
                          color={mapColor.get(player.color)}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
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
                Start The Game
              </Button>
            </FormControl>
          </form>
        </Grid>
      </Paper>
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
    const { showNotification, newGame } = this.props;
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

    console.log(activePlayers);

    if (isGameReady) {
      newGame({
        variables: {
          gameName,
          players: activePlayers,
        },
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
