import React, { PureComponent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { FileCopyOutlined } from '@material-ui/icons';

import { ShareGameStylesProps } from './ShareGameWithStyles';

type ShareGameProps = ShareGameStylesProps & {
  gameId: string;
  showNotification(message: string): void;
};

export class ShareGame extends PureComponent<ShareGameProps> {
  public render() {
    const { classes, gameId } = this.props;

    return (
      <Grid item container spacing={2} alignItems="center" className={classes.root}>
        <Grid item xs={10} className={classes.gameIdLabel}>
          <TextField
            fullWidth
            helperText="Share this id with the other players"
            value={gameId}
            id="game-id"
            contentEditable={false}
          />
        </Grid>
        <Grid item xs={2} className={classes.copyIcon}>
          <FileCopyOutlined onClick={this.focusGameId} />
        </Grid>
      </Grid>
    );
  }

  private focusGameId = async () => {
    const { showNotification, gameId } = this.props;
    try {
      await navigator.clipboard.writeText(gameId);
    } catch (err) {
      showNotification('Ops! cannot copy the link. Please, do it manually');
      return;
    }

    showNotification('Game Id copied to clipboard');
  };
}
