import React, { PureComponent } from 'react';
import { List } from '@material-ui/core';

import { PlayerItemsStylesProps } from './PlayerItemsWithStyles';
import { Player } from '..';
import { PlayerItem } from '../PlayerItem';

type PlayerItemsProps = PlayerItemsStylesProps & {
  players: Player[];
  playerSelected?: Player;
  disabled: boolean;
  handleListItemClick(player: Player): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export class PlayerItems extends PureComponent<PlayerItemsProps> {
  public render() {
    const { classes, players, handleListItemClick, playerSelected, disabled } = this.props;

    return (
      <List className={classes.root}>
        {players.map((player: Player) => (
          <PlayerItem
            key={`PlayerItem-${player.color}`}
            player={player}
            playerSelected={playerSelected}
            disabled={disabled}
            handleListItemClick={handleListItemClick}
          />
        ))}
      </List>
    );
  }
}
