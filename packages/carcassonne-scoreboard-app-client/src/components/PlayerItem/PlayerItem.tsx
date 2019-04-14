import React, { PureComponent } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import { Meeple, mapColor } from '../Icons';
import { PlayerItemStylesProps } from './PlayerItemWithStyles';
import { Player } from '../Game';

type PlayerItemProps = PlayerItemStylesProps & {
  players: Player[];
  playerSelected?: string;
  disabled: boolean;
  handleListItemClick(
    playerName: string
  ): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export class PlayerItem extends PureComponent<PlayerItemProps> {
  public render() {
    const { classes, players, handleListItemClick, playerSelected, disabled } = this.props;

    return (
      <List className={classes.root}>
        {players.map((player: Player) => (
          <ListItem
            disabled={disabled}
            key={player.key}
            alignItems="center"
            classes={{ selected: classes.listItemSelected }}
            selected={playerSelected === player.key}
            onClick={handleListItemClick(player.key)}
            divider
            button
          >
            <ListItemIcon>
              <Meeple
                className={classes.meeple}
                fontSize="2.25em"
                color={mapColor.get(player.color)}
              />
            </ListItemIcon>
            <ListItemText primary={player.name} secondary={`${player.score || 0}pt`} />
          </ListItem>
        ))}
      </List>
    );
  }
}
