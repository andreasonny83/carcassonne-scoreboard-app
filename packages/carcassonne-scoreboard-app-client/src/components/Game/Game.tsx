import React, { PureComponent } from 'react';
import {
  Paper,
  Typography,
  Grid,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  Button,
} from '@material-ui/core';
import { ExpandMore, FileCopyOutlined } from '@material-ui/icons';

import { Meeple } from '../Icons';
import { GameStylesProps } from './GameWithStyles';
import { ChildPropsData, subscribeToAuthorMutations } from './Game.container';

type GameComponentProps = GameStylesProps &
  ChildPropsData & {
    showNotification(message: string): void;
    startGame(options: any): any;
    updateGame(options: any): any;
  };

export class GameComponent extends PureComponent<GameComponentProps> {
  private gameIdRef: any;
  private unsubscribe: any;

  public componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  public render() {
    const { data, classes } = this.props;
    const mapColor = new Map([
      ['green', '#689f38'],
      ['red', '#d32f2f'],
      ['blue', '#1e88e5'],
      ['yellow', '#fdd835'],
      ['black', '#263238'],
      ['gray', '#9e9e9e'],
    ]);

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
        <Grid direction="column" container>
          <Typography component="h2" variant="h4" align="center" gutterBottom>
            {data.game.name}
          </Typography>
          <Typography component="h2" variant="h4" align="center" gutterBottom>
            Game started:{`${data.game.started}`}
          </Typography>

          <Button onClick={this.startGame}>Start Game</Button>
          <Button onClick={this.updateGame}>update</Button>

          <Grid item container spacing={8} alignItems="flex-end">
            <Grid item xs={10} className={classes.gameIdLabel}>
              <TextField
                fullWidth
                label="Game id:"
                value={data.game.id}
                id="game-id"
                inputRef={node => (this.gameIdRef = node)}
                onSelect={this.gameIdOnFocus}
                onFocus={this.focusGameId}
              />
            </Grid>
            <Grid item>
              <FileCopyOutlined onClick={this.focusGameId} />
            </Grid>
          </Grid>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            Share this id with the other players
          </Typography>
        </Grid>
        <Grid direction="column" container>
          {data.game.players.map(player => (
            <ExpansionPanel key={player.key} className={classes.expansionPanel}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                classes={{ content: classes.content }}
              >
                <div className={classes.meepleColumn}>
                  <Meeple
                    className={classes.meeple}
                    fontSize="2.25em"
                    color={mapColor.get(player.color)}
                  />
                </div>
                <div className={classes.column}>
                  <Typography className={classes.heading}>{player.name}</Typography>
                </div>
                <div className={classes.scoreColumn}>
                  <Typography className={classes.scoreHeading}>{player.score || 0}pt</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <div className={classes.column} />
                <div className={classes.column}>test</div>
                <div>
                  <Typography variant="caption">
                    Select your destination of choice
                    <br />
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Grid>
      </Paper>
    );
  }

  private focusGameId = () => {
    this.gameIdRef.select();
  };

  private gameIdOnFocus = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const { showNotification } = this.props;
    this.gameIdRef.select();
    document.execCommand('copy');

    showNotification('Game Id copied to clipboard');
  };

  private startGame = () => {
    const { data, startGame, showNotification } = this.props;
    const gameId = data && data.game && data.game.id;
    console.log(this.props);

    if (!gameId) {
      showNotification('Something went wrong!');
      return;
    }

    startGame({
      variables: { gameId },
    });
  };

  private updateGame = () => {
    const { data, updateGame, showNotification } = this.props;
    const gameId = data && data.game && data.game.id;
    const score = 10;
    const playerKey = 'player1';

    if (!gameId) {
      showNotification('Something went wrong!');
      return;
    }

    updateGame({
      variables: { gameId, playerKey, score },
    });
  };
}
