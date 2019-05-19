import React, { PureComponent } from 'react';
import get from 'lodash/get';
import { Paper, Typography, Grid, CircularProgress, Button } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { GameStylesProps } from './GameWithStyles';
import { ChildPropsData, Player, onGameUpdated } from './Game.container';
import { PlayerItems } from './PlayerItem';
import { LogItemsWithStyles as LogItems } from './LogItem';
import { UpdateScore } from './UpdateScore';
import { ShareGame } from './ShareGame';
import { formatErrorAndLog } from '../../utils/formatErrors';
import { UserState } from '../../reducers/user';

type GameComponentProps = GameStylesProps &
  ChildPropsData & {
    user: UserState;
    width: Breakpoint;
    showNotification(message: string): void;
    joinGame(options: any): any;
    startGame(options: any): any;
    endGame(options: any): any;
    updateGame(options: any): any;
    redeemPlayer(options: any): any;
    undoMove(options: any): any;
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

  public componentDidMount() {
    const { data, match } = this.props;
    const gameId = match && match.params && match.params.gameId;

    if (!gameId) {
      return;
    }

    this.unsubscribeGameUpdated = onGameUpdated(data.subscribeToMore, gameId);
  }

  public componentWillUnmount() {
    this.unsubscribeGameUpdated();
  }

  public componentDidUpdate(prev: GameComponentProps) {
    const { data, showNotification } = this.props;
    const { disableButtons } = this.state;

    const newLog = get(data, 'game.log', []).length;
    const currLog = get(prev, 'data.game.log', []).length;

    if (disableButtons && newLog !== currLog) {
      this.setState({
        disableButtons: false,
        updatingScores: false,
      });

      showNotification('Game updated');
    }
  }

  public render() {
    const { data, width, match, user, classes } = this.props;
    const { updateScoreOpened, selectedPlayer, updatingScores, disableButtons } = this.state;
    const gameId = get(match, 'params.gameId');
    const isMobile = !isWidthUp('sm', width);

    if (data.loading) {
      return (
        <Paper
          elevation={isMobile ? 0 : 1}
          square={isMobile}
          className="paper"
          style={{ padding: '4em' }}
        >
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
        <Paper elevation={isMobile ? 0 : 1} square={isMobile} className={classes.root}>
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
    const userIsAPlayer = Boolean(~game.users.indexOf(user.username));
    const userHasAMeeple = Boolean(game.players.find(player => player.userId === user.username));

    return (
      <Paper elevation={isMobile ? 0 : 1} square={isMobile} className={classes.root}>
        <Typography className={classes.gameCreated}>Game created: {game.date}</Typography>

        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography component="h2" variant="h4" align="center" className={classes.title}>
              {game.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography align="center" gutterBottom>
              {!game.started && !game.finished && !userIsAPlayer && `The game has not started yet`}
              {!game.started &&
                !game.finished &&
                userIsAPlayer &&
                `Press Start Game when you're ready!`}
              {game.started && !game.finished && !userIsAPlayer && `The game is in progress.`}
              {game.started && !game.finished && userIsAPlayer && `Game started. Good luck!`}
              {game.finished && `This Game is Ended`}
            </Typography>
          </Grid>

          {!game.finished && (
            <Grid item xs={12}>
              <ShareGame gameId={game.id} />
            </Grid>
          )}

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
            {!userIsAPlayer && (
              <>
                <Typography align="center">You're watching this game</Typography>
                <Typography align="center">
                  If you are a player, click 'Join this game' to interact.
                </Typography>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                  <Button
                    className={classes.buttons}
                    color="primary"
                    variant="outlined"
                    disabled={disableButtons}
                    onClick={this.joinGame}
                  >
                    Join this game
                  </Button>
                </Grid>
              </>
            )}

            {userIsAPlayer && !game.started && !game.finished && (
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

            {userIsAPlayer && game.started && !game.finished && (
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
                    disabled={updatingScores || disableButtons || !game.log.length}
                    onClick={this.undoMove}
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
                items={game.players}
                showRedeem={userIsAPlayer && !userHasAMeeple}
                itemSelected={selectedPlayer}
                handleListItemClick={this.handleSelectPlayer}
                onRedeem={this.redeemPlayer}
              />
            </Grid>
          </Grid>
        )}

        {game.log.length ? (
          <Grid direction="column" container>
            <Typography className={classes.logTitle} component="h3" variant="h6">
              Game Log
            </Typography>

            <Grid item xs={12}>
              <LogItems items={game.log} />
            </Grid>
          </Grid>
        ) : null}

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
    const gameId = get(data, 'game.id');

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

  private joinGame = async () => {
    const { data, joinGame, showNotification } = this.props;
    const gameId = get(data, 'game.id');

    if (!gameId) {
      showNotification('Ops! Something went wrong 🤷‍');
      return;
    }

    this.setState({
      disableButtons: true,
    });

    try {
      await joinGame({
        variables: {
          joinGameInput: { gameId },
        },
      });
    } catch (err) {
      showNotification(`⛔️ ${formatErrorAndLog(err).message}`);
    }

    this.setState({
      disableButtons: false,
    });
  };

  private undoMove = async () => {
    const { showNotification, undoMove, data } = this.props;
    const gameId = get(data, 'game.id');

    this.setState({
      disableButtons: true,
    });

    try {
      await undoMove({
        variables: {
          undoLastMoveInput: {
            gameId,
          },
        },
      });
    } catch (err) {
      this.setState({ disableButtons: false });
      showNotification(`⛔️ ${formatErrorAndLog(err).message}`);
    }
  };

  private endGame = async () => {
    const { data, endGame, showNotification } = this.props;
    const gameId = get(data, 'game.id');

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
    const game = get(data, 'game');

    if (!selectedPlayer || !game || !newScore) {
      this.setState({
        updateScoreOpened: false,
      });

      return;
    }

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
    const game = get(data, 'game');

    if (!game) {
      return;
    }

    this.setState({
      selectedPlayer: playerSelected,
    });
  };

  private redeemPlayer = (playerSelected: Player) => async () => {
    const { showNotification, redeemPlayer, data } = this.props;
    const game = get(data, 'game');

    if (!game) {
      return;
    }

    try {
      await redeemPlayer({
        variables: {
          redeemPlayerInput: {
            gameId: game.id,
            player: playerSelected.color,
          },
        },
      });
    } catch (err) {
      this.setState({ disableButtons: false });
      showNotification(`⛔️ ${formatErrorAndLog(err).message}`);
    }
  };
}
