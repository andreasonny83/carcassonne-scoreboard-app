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

import { Meeple, mapColor } from '../../Icons';
import { NewPlayerStylesProps } from './NewPlayerWithStyles';
import { NewGamePlayer } from '../NewGame.container';

type NewPlayerProps = NewPlayerStylesProps & {
  player: NewGamePlayer;
  placeholder: string;
  labelWidth: number;
  busy: boolean;
  hideDelete?: boolean;
  onRemovePlayer(event: any, player: NewGamePlayer): void;
  onChange(event: any, player: NewGamePlayer, field: string): void;
};

export class NewPlayer extends PureComponent<NewPlayerProps> {
  public render() {
    const {
      classes,
      player,
      busy,
      hideDelete,
      placeholder,
      labelWidth,
      onRemovePlayer,
      onChange,
    } = this.props;

    return (
      <Grid container direction="row" alignItems="center" justify="center">
        {!hideDelete && (
          <Grid item xs={2} className={classes.deleteContainer}>
            <Fab
              size="medium"
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
        <Grid item xs={hideDelete ? 12 : 10} className={classes.gridItem}>
          <FormControl
            variant="outlined"
            disabled={busy}
            required
            fullWidth
            className={classes.formControl}
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
