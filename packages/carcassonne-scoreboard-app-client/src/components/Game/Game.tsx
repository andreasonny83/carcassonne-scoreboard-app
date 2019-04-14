import React, { PureComponent } from 'react';
import { Paper, Typography, Grid, CircularProgress, Button } from '@material-ui/core';

import { GameStylesProps } from './GameWithStyles';
import { ChildPropsData, subscribeToAuthorMutations } from './Game.container';
import { PlayerItem } from '../PlayerItem';
import { UpdateScore } from '../UpdateScore';
import { MeepleColor } from '../Icons';
import { ShareGame } from '../ShareGame';

type GameComponentProps = GameStylesProps &
  ChildPropsData & {
    showNotification(message: string): void;
    startGame(options: any): any;
    updateGame(options: any): any;
  };

const initialState = {
  updateScoreOpened: false,
  selectedPlayer: '',
  selectedPlayerName: '',
};

type GameState = typeof initialState & {
  selectedPlayerColor?: MeepleColor;
};

export class GameComponent extends PureComponent<GameComponentProps, GameState> {
  public readonly state: GameState = initialState;
  private unsubscribe: any;

  public componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  public render() {
    const { data, classes } = this.props;
    const {
      updateScoreOpened,
      selectedPlayer,
      selectedPlayerName,
      selectedPlayerColor,
    } = this.state;

    if (data.loading) {
      return (
        <Paper elevation={1} className={classes.root}>
          <Grid direction="column" alignContent="center" container>
            <CircularProgress className={classes.loading} />
          </Grid>
        </Paper>
      );
    }

    if (data.error || !data.game) {
      const graphQLError =
        (data &&
          data.error &&
          data.error.graphQLErrors &&
          data.error.graphQLErrors[0] &&
          data.error.graphQLErrors[0].message) ||
        'Ops! Something went wrong.';

      return (
        <Paper elevation={1} className={classes.root}>
          <Grid direction="column" container>
            <Typography component="h2" variant="h4" align="center" gutterBottom>
              Error
            </Typography>
            <Typography component="p" align="center">
              {graphQLError}
            </Typography>
          </Grid>
        </Paper>
      );
    }

    if (!this.unsubscribe && !data.game.finished) {
      this.unsubscribe = subscribeToAuthorMutations(data.subscribeToMore);
    }

    return (
      <Paper elevation={1} className={classes.root}>
        <Grid direction="column" container alignItems="center">
          <Typography component="h2" variant="h4" align="center">
            {data.game.name}
          </Typography>

          <Typography component="caption" align="center" gutterBottom>
            {(!data.game.started && `Press Start Game when you're ready!`) ||
              `Game started. Good luck!`}
          </Typography>

          <ShareGame gameId={data.game.id} />

          {!data.game.started && (
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justify="center"
              spacing={8}
              className={classes.actionButtons}
            >
              <Button color="primary" variant="outlined" onClick={this.startGame}>
                Start Game
              </Button>
            </Grid>
          )}

          {data.game.started && (
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justify="center"
              spacing={8}
              className={classes.actionButtons}
            >
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <Button
                  fullWidth={true}
                  className={classes.buttons}
                  color="primary"
                  variant="outlined"
                  disabled={!selectedPlayer || !data.game.started}
                  onClick={this.handleShowUpdateScore}
                >
                  Add points
                </Button>
              </Grid>
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <Button
                  className={classes.buttons}
                  color="secondary"
                  variant="outlined"
                  onClick={this.undoScore}
                >
                  Undo
                </Button>
              </Grid>
            </Grid>
          )}

          <UpdateScore
            playerName={selectedPlayerName}
            color={selectedPlayerColor}
            open={updateScoreOpened}
            onClose={this.handleHideUpdateScore}
          />

          <Grid item container>
            <Typography variant="caption" color="textSecondary" gutterBottom>
              Share this id with the other players
            </Typography>
          </Grid>
        </Grid>
        <Grid direction="column" container>
          <PlayerItem
            disabled={!data.game.started}
            players={data.game.players}
            handleListItemClick={this.handleSelectPlayer}
            playerSelected={selectedPlayer}
          />
        </Grid>
      </Paper>
    );
  }

  private startGame = () => {
    const { data, startGame, showNotification } = this.props;
    const gameId = data && data.game && data.game.id;

    if (!gameId) {
      showNotification('Something went wrong!');
      return;
    }

    startGame({
      variables: {
        startGameInput: { gameId },
      },
    });
  };

  private undoScore = () => {
    //
  };

  private handleShowUpdateScore = () => {
    this.setState({
      updateScoreOpened: true,
    });
  };

  private handleHideUpdateScore = (newScore: any) => {
    const { data, updateGame, showNotification } = this.props;
    const { selectedPlayer } = this.state;
    const game = data && data.game;

    console.log('new score', newScore);
    console.log('selectedPlayer', selectedPlayer);
    if (!game) {
      this.setState({
        updateScoreOpened: false,
      });
      return;
    }

    const gameId = game.id;

    updateGame({
      variables: {
        updateGameInput: {
          gameId,
          playerKey: selectedPlayer,
          score: newScore,
        },
      },
    })
      .finally(() => {
        this.setState({
          updateScoreOpened: false,
        });
      })
      .then(() => {
        showNotification('New score updated');
      })
      .catch((err: any) => {
        showNotification(err.message || 'Something went wrong');
      });
  };

  private handleSelectPlayer = (playerKey: string) => () => {
    const { data } = this.props;

    if (!(data && data.game)) {
      return;
    }

    const selectedPlayer = data.game.players.find(player => player.key === playerKey);

    if (!selectedPlayer) {
      return;
    }

    this.setState({
      selectedPlayer: playerKey,
      selectedPlayerName: selectedPlayer.name,
      selectedPlayerColor: selectedPlayer.color,
    });
  };
}
