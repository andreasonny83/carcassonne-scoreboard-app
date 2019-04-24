import React, { PureComponent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { UpdateScoreStylesProps } from './UpdateScoreWirhStyles';
import { Meeple, mapColor, MeepleColor } from '../../Icons';

interface UpdateScoreProps extends UpdateScoreStylesProps {
  playerName: string;
  color?: MeepleColor;
  open: boolean;
  onClose: any;
}

interface UpdateScoreState {
  score: number | null;
}

const initialState: UpdateScoreState = {
  score: null,
};

export class UpdateScore extends PureComponent<UpdateScoreProps, UpdateScoreState> {
  public readonly state: UpdateScoreState = initialState;

  public render() {
    const { open, playerName, color, classes } = this.props;
    const { score } = this.state;

    return (
      <Dialog
        open={open}
        onEnter={this.resetScore}
        onKeyPress={this.handleKeyPress}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container direction="column" alignContent="center">
            {typeof color !== 'undefined' && (
              <Meeple className={classes.meeple} fontSize="1.75em" color={mapColor.get(color)} />
            )}
          </Grid>
          <Typography align="center" component="p" variant="h5">
            Update Score
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            How many points do you want to assign to {playerName}?
          </DialogContentText> */}
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="name"
            label="Add Points"
            type="number"
            value={score || ''}
            onChange={this.updateScore}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { score } = this.state;

    if (event.key === 'Enter' && score && score > 0) {
      this.handleClose();
    }
  };

  private handleClose = () => {
    const { score } = this.state;
    const { onClose } = this.props;
    onClose(score);
  };

  private resetScore = () => {
    this.setState({
      score: null,
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
