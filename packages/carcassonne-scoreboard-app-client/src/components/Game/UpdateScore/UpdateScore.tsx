import React, { PureComponent } from 'react';
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { UpdateScoreStylesProps } from './UpdateScoreWirhStyles';
import { Meeple, mapColor } from '../../Icons';
import { Player } from '../Game.container';

interface UpdateScoreProps extends UpdateScoreStylesProps {
  player?: Player;
  open: boolean;
  onClose: any;
}

interface UpdateScoreState {
  readonly score?: number | null;
}

const initialState: UpdateScoreState = {};

export class UpdateScore extends PureComponent<UpdateScoreProps, UpdateScoreState> {
  public readonly state = initialState;

  public render() {
    const { open, player, classes } = this.props;
    const { score } = this.state;

    return (
      <Dialog
        open={open}
        onEnter={this.resetScore}
        onKeyPress={this.handleKeyPress}
        onClose={this.handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container direction="column" alignContent="center">
            {player && (
              <Meeple
                className={classes.meeple}
                fontSize="1.75em"
                color={mapColor.get(player.color)}
              />
            )}
          </Grid>
          <Typography align="center" component="p" variant="h5">
            Update Score
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="name"
            label="Add Points"
            type="number"
            inputProps={{ min: '0', max: '100', step: '1' }}
            value={score || ''}
            onChange={this.updateScore}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { score } = this.state;

    if (event.key === 'Enter' && score && score > 0) {
      this.handleAdd();
    }
  };

  private handleAdd = () => {
    const { score } = this.state;

    if (!score || score < 1) {
      return this.handleCancel();
    }

    this.handleClose(Number(score));
  };

  private handleCancel = () => {
    this.handleClose();
  };

  private handleClose = (score?: number) => {
    const { onClose } = this.props;

    onClose(score);
  };

  private resetScore = () => {
    this.setState({
      score: 0,
    });
  };

  private updateScore = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const value: string = target && target.value;

    this.setState({
      score: Number(value),
    });
  };
}
