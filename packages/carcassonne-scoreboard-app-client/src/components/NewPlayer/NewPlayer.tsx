import React, { PureComponent } from 'react';
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  Fab,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { Meeple, mapColor } from '../Icons';
import { NewPlayerStylesProps } from './NewPlayerWithStyles';
import { IPlayer } from '../NewGame';

type NewPlayerProps = NewPlayerStylesProps & {
  player: IPlayer;
  placeholder: string;
  labelWidth: number;
  busy: boolean;
  autoFocus?: boolean;
  hideDelete?: boolean;
  onRemovePlayer(event: any, player: IPlayer): void;
  onChange(event: any, player: IPlayer, field: string): void;
};

export class NewPlayer extends PureComponent<NewPlayerProps> {
  public render() {
    const {
      classes,
      player,
      busy,
      autoFocus,
      hideDelete,
      placeholder,
      labelWidth,
      onRemovePlayer,
      onChange,
    } = this.props;

    return (
      <Grid container spacing={16} direction="row" alignItems="center" justify="center">
        {!hideDelete && (
          <Grid item xs={1} className={classes.deleteContainer}>
            <Fab
              size="small"
              color="primary"
              aria-label="Delete"
              onClick={event => onRemovePlayer(event, player)}
              disabled={busy}
              classes={{
                primary: classes.deleteButton,
              }}
            >
              <Delete fontSize="small" />
            </Fab>
          </Grid>
        )}
        <Grid item xs={hideDelete ? 12 : 11}>
          <FormControl
            margin="normal"
            variant="outlined"
            className={classes.formControl}
            disabled={busy}
            required
            fullWidth
          >
            <InputLabel htmlFor={`${player.key}-name`} variant="outlined">
              {placeholder}
            </InputLabel>
            <OutlinedInput
              id={`${player.key}-name`}
              name={`${player.key}-name`}
              value={`${player.name}`}
              onChange={event => onChange(event, player, 'name')}
              type="string"
              placeholder="Player Name"
              labelWidth={labelWidth}
              autoFocus={autoFocus}
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
              onChange={event => onChange(event, player, 'color')}
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
            <Meeple className={classes.meeple} fontSize="3em" color={mapColor.get(player.color)} />
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}
