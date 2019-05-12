import get from 'lodash/get';
import React, { PureComponent } from 'react';
import { Paper, Grid, Typography, Button, CircularProgress } from '@material-ui/core';

import { GamesStylesProps } from './GamesWithStyles';
import { Twemoji } from '../twemoji';
import { ChildPropsData } from './Games.container';
import { GameItems } from './GameItems';
import { formatErrorAndLog } from '../../utils/formatErrors';

type GamesProps = GamesStylesProps &
  ChildPropsData & {
    updateUser(data: any): any;
    updateUserData(data: any): any;
    go(path: string): void;
    showNotification(message: string): void;
  };

export class Games extends PureComponent<GamesProps> {
  public render(): JSX.Element {
    const { classes, data } = this.props;
    const { loading, error, user } = data;

    if (loading) {
      return (
        <Paper className="paper" style={{ padding: '4em' }}>
          <Grid direction="column" alignItems="center" container>
            <CircularProgress style={{ marginBottom: '2em' }} />
            <Typography>Preparing games screen...</Typography>
          </Grid>
        </Paper>
      );
    }

    if (error || !user) {
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
          </Grid>
        </Paper>
      );
    }

    const gamesCompleted = user.games.filter(game => game.finished);
    const gamesInProgress = user.games.filter(game => !game.finished);

    return (
      <Paper elevation={1} className={classes.root}>
        <Grid container className={classes.goBack}>
          <Button variant="outlined" color="secondary" onClick={this.goBack}>
            Go Back
          </Button>
        </Grid>

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          className={classes.title}
        >
          My Games
        </Typography>

        <Grid container direction="column" alignItems="center">
          <Button variant="outlined" color="primary" onClick={this.newGame}>
            <Twemoji copy="Start a new game ▶️" size={24} />
          </Button>
        </Grid>

        <Grid direction="column" container>
          <Typography className={classes.sections} component="h3" variant="h6" gutterBottom>
            Games In Progress
          </Typography>
          {gamesInProgress.length ? (
            <GameItems games={gamesInProgress} onJoin={this.onJoin} />
          ) : (
            <Typography>You have no games in progress</Typography>
          )}
        </Grid>

        <Grid direction="column" container>
          <Typography className={classes.sections} component="h3" variant="h6" gutterBottom>
            Games Completed
          </Typography>
          {gamesCompleted.length ? (
            <GameItems games={gamesCompleted} onJoin={this.onJoin} />
          ) : (
            <Typography>You have no games completed yet</Typography>
          )}
        </Grid>
      </Paper>
    );
  }

  private goBack = () => {
    const { go } = this.props;

    go('/app');
  };

  private newGame = () => {
    const { go } = this.props;

    go('/app/game/new');
  };

  private onJoin = (gameId: string) => async () => {
    const { go } = this.props;

    go(`/app/game/${gameId}`);
  };
}
