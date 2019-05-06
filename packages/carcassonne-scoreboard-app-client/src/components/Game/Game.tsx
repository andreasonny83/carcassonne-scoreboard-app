import React, { PureComponent } from 'react';
import get from 'lodash/get';
import { Paper, Typography, Grid, CircularProgress, Button } from '@material-ui/core';

import { GameStylesProps } from './GameWithStyles';
import { ChildPropsData, Player, onGameUpdated, onGameUpdating } from './Game.container';
import { PlayerItems } from './PlayerItems';
import { UpdateScore } from './UpdateScore';
import { ShareGame } from './ShareGame';
import { formatErrorAndLog } from '../../utils/formatErrors';

type GameComponentProps = GameStylesProps &
  ChildPropsData & {
    showNotification(message: string): void;
    startGame(options: any): any;
    endGame(options: any): any;
    updateGame(options: any): any;
  };

interface GameState {
  updateScoreOpened: boolean;
  selectedPlayer?: Player;
  updatingScores?: boolean;
  disableButtons?: boolean;
}

const initialState: GameState = {
  updateScoreOpened: false,
};

export class GameComponent extends PureComponent<GameComponentProps, GameState> {
  public readonly state: GameState = initialState;
  private unsubscribeGameUpdated: any;
  private unsubscribeGameUpdating: any;

  public componentDidMount() {
    const { data } = this.props;

    this.unsubscribeGameUpdated = onGameUpdated(data.subscribeToMore);
    this.unsubscribeGameUpdating = onGameUpdating(data.subscribeToMore);
  }

  public componentWillUnmount() {
    this.unsubscribeGameUpdated();
    this.unsubscribeGameUpdating();
  }

  public componentDidUpdate() {
    const { data, showNotification } = this.props;
    const { updatingScores } = this.state;
    const currentScoresUpdatingStatus = Boolean(data.gameUpdating && data.gameUpdating.loading);

    if (!currentScoresUpdatingStatus && updatingScores) {
      this.setState({
        disableButtons: false,
        updatingScores: currentScoresUpdatingStatus,
      });

      showNotification('New score updated');
      return;
    }

    this.setState({
      updatingScores: currentScoresUpdatingStatus,
    });
  }

  public render() {
    const { data, classes } = this.props;
    const { updateScoreOpened, selectedPlayer, updatingScores, disableButtons } = this.state;

    const gameId = this.props.match && this.props.match.params && this.props.match.params.gameId;

    if (data.loading) {
      return (
        <Paper className="paper" style={{ padding: '4em' }}>
          <Grid direction="column" alignItems="center" container>
            <CircularProgress style={{ marginBottom: '2em' }} />
            <Typography>Searching for a game named {gameId}...</Typography>
          </Grid>
        </Paper>
      );
    }

    if (data.error || !data.game) {
      const graphQLError = get(
        data,
        'error.graphQLErrors[0].message',
        'Ops! Something went wrong.'
      );

      return (
        <Paper elevation={1} className={classes.root}>
          <Grid direction="column" container>
            <Typography component="h2" variant="h4" align="center" gutterBottom>
              Error
            </Typography>
            <Typography component="p" align="center">
              {graphQLError}
            </Typography>
            <Typography align="center">
              Make sure you spelled the game {gameId} correctly then try again
            </Typography>
          </Grid>
        </Paper>
      );
    }

    const { game } = data;

    return (
      <Paper elevation={1} className={classes.root}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography component="h2" variant="h4" align="center" className={classes.title}>
              {game.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography align="center" gutterBottom>
              {!game.started && !game.finished && `Press Start Game when you're ready!`}
              {game.started && !game.finished && `Game started. Good luck!`}
              {game.started && game.finished && `Game Ended`}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <ShareGame gameId={game.id} />
          </Grid>

          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xs={12}
            spacing={2}
            className={classes.actionButtons}
          >
            {!game.started && !game.finished && (
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <Button
                  className={classes.buttons}
                  color="primary"
                  variant="outlined"
                  disabled={disableButtons}
                  onClick={this.startGame}
                >
                  Start Game
                </Button>
              </Grid>
            )}

            {game.started && !game.finished && (
              <>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                  <Button
                    className={classes.buttons}
                    color="primary"
                    variant="outlined"
                    disabled={!selectedPlayer || updatingScores || disableButtons || !game.started}
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
                    disabled={updatingScores || disableButtons}
                    onClick={this.undoScore}
                  >
                    Undo
                  </Button>
                </Grid>
              </>
            )}
          </Grid>

          <UpdateScore
            player={selectedPlayer}
            open={updateScoreOpened}
            onClose={this.handleHideUpdateScore}
          />
        </Grid>

        {(updatingScores && (
          <Grid direction="column" alignContent="center" container>
            <CircularProgress className={classes.loading} />
          </Grid>
        )) || (
          <Grid direction="column" container>
            <Grid item xs={12}>
              <PlayerItems
                disabled={!game.started}
                finished={game.finished}
                players={game.players}
                handleListItemClick={this.handleSelectPlayer}
                playerSelected={selectedPlayer}
              />
            </Grid>
          </Grid>
        )}

        {game.started && !game.finished && (
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xs={12}
            spacing={2}
            className={classes.actionButtons}
          >
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Button
                className={classes.buttons}
                color="secondary"
                variant="outlined"
                onClick={this.endGame}
                disabled={updatingScores || disableButtons}
              >
                End Game
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    );
  }

  private startGame = async () => {
    const { data, startGame, showNotification } = this.props;
    const gameId = data && data.game && data.game.id;

    if (!gameId) {
      showNotification('Ops! Something went wrong 🤷‍');
      return;
    }

    this.setState({
      disableButtons: true,
    });

    try {
      await startGame({
        variables: {
          startGameInput: { gameId },
        },
      });
    } catch (err) {
      showNotification(`⛔️ ${formatErrorAndLog(err).message}`);
    }

    this.setState({
      disableButtons: false,
    });
  };

  private undoScore = async () => {
    //
  };

  private endGame = async () => {
    const { data, endGame, showNotification } = this.props;
    const gameId = data && data.game && data.game.id;

    this.setState({
      disableButtons: true,
    });

    try {
      await endGame({
        variables: {
          endGameInput: { gameId },
        },
      });
    } catch (err) {
      formatErrorAndLog(err);
      showNotification('Something went wrong. Cannot end this game 🤷‍');
    }

    this.setState({
      disableButtons: false,
    });
  };

  private handleShowUpdateScore = () => {
    this.setState({
      updateScoreOpened: true,
    });
  };

  private handleHideUpdateScore = async (newScore: number) => {
    const { data, updateGame, showNotification } = this.props;
    const { selectedPlayer } = this.state;
    const game = data && data.game;

    if (!selectedPlayer || !game || !newScore) {
      this.setState({
        updateScoreOpened: false,
      });

      return;
    }

    console.log('disable buttons');

    this.setState({
      updateScoreOpened: false,
      disableButtons: true,
    });

    const gameId = game.id;

    try {
      await updateGame({
        variables: {
          updateGameInput: {
            gameId,
            player: selectedPlayer.color,
            score: newScore,
          },
        },
      });
    } catch (err) {
      this.setState({ disableButtons: false });
      showNotification(`⛔️ ${formatErrorAndLog(err).message}`);
    }
  };

  private handleSelectPlayer = (playerSelected: Player) => () => {
    const { data } = this.props;
    if (!(data && data.game)) {
      return;
    }

    this.setState({
      selectedPlayer: playerSelected,
    });
  };
}
