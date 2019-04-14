import React, { PureComponent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { FileCopyOutlined } from '@material-ui/icons';

import { ShareGameStylesProps } from './ShareGameWithStyles';

type ShareGameProps = ShareGameStylesProps & {
  gameId: string;
  showNotification(message: string): void;
};

export class ShareGame extends PureComponent<ShareGameProps> {
  private gameIdRef: any;

  public render() {
    const { classes, gameId } = this.props;

    return (
      <Grid item container spacing={8} alignItems="flex-end" className={classes.root}>
        <Grid item xs={10} className={classes.gameIdLabel}>
          <TextField
            fullWidth
            label="Game id:"
            value={gameId}
            id="game-id"
            inputRef={node => (this.gameIdRef = node)}
            onSelect={this.gameIdOnFocus}
            onFocus={this.focusGameId}
          />
        </Grid>
        <Grid item xs={2} className={classes.copyIcon}>
          <FileCopyOutlined onClick={this.focusGameId} />
        </Grid>
      </Grid>
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
}
