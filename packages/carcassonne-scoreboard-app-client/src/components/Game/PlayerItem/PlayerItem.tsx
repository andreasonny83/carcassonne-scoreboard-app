import React, { PureComponent } from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import { Meeple, mapColor } from '../../Icons';
import { PlayerItemStylesProps } from './PlayerItemWithStyles';
import { Player } from '..';
import { Avatar } from 'react-avataaars';

type PlayerItemProps = PlayerItemStylesProps & {
  player: Player;
  playerSelected?: Player;
  disabled: boolean;
  handleListItemClick(player: Player): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export class PlayerItem extends PureComponent<PlayerItemProps> {
  public render() {
    const { classes, player, handleListItemClick, playerSelected, disabled } = this.props;

    return (
      <ListItem
        disabled={disabled}
        key={`player-${player.color}`}
        alignItems="center"
        classes={{ selected: classes.listItemSelected }}
        selected={playerSelected && playerSelected.color === player.color}
        onClick={handleListItemClick(player)}
        divider
        button
      >
        <ListItemIcon className={classes.listItemIcon}>
          {(player.picture && (
            <div className={classes.avatarWrapper}>
              <Avatar size="46px" hash={player.picture} className={classes.avatar} />
            </div>
          )) || (
            <Meeple
              className={classes.meeple}
              fontSize="2.25em"
              color={mapColor.get(player.color)}
            />
          )}
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={player.name}
          secondary={`${player.score || 0}pt`}
        />
      </ListItem>
    );
  }
}
