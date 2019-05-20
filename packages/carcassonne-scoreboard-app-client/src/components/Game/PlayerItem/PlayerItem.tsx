import React, { PureComponent } from 'react';
import { ListItem, ListItemText, ListItemIcon, Button } from '@material-ui/core';

import { Meeple, mapColor } from '../../Icons';
import { PlayerItemStylesProps } from './PlayerItemWithStyles';
import { Player } from '..';
import { Avatar } from 'react-avataaars';
import { UserState } from '../../../reducers/user';

type PlayerItemProps = PlayerItemStylesProps & {
  player: Player;
  isMe: boolean;
  user: UserState;
  finished: boolean;
  playerSelected?: Player;
  showRedeem?: boolean;
  disabled?: boolean;
  handleListItemClick?(player: Player): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onRedeem?(player: Player): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const getItemIcon = (
  player: Player,
  user: UserState,
  isMe: boolean,
  finished: boolean,
  classes: any
) => {
  if (isMe) {
    return (
      <div className={classes.avatarWrapper}>
        <Avatar size="46px" hash={user.picture} className={classes.avatar} />
      </div>
    );
  }

  if (finished) {
    return (
      <Meeple className={classes.meeple} fontSize="2.25em" color={mapColor.get(player.color)} />
    );
  }

  return (
    (player.picture && (
      <div className={classes.avatarWrapper}>
        <Avatar size="46px" hash={player.picture} className={classes.avatar} />
      </div>
    )) || <Meeple className={classes.meeple} fontSize="2.25em" color={mapColor.get(player.color)} />
  );
};

export class PlayerItem extends PureComponent<PlayerItemProps> {
  public render() {
    const {
      classes,
      player,
      disabled,
      finished,
      showRedeem,
      playerSelected,
      isMe,
      user,
      handleListItemClick,
      onRedeem,
    } = this.props;

    return (
      <ListItem
        disabled={disabled}
        key={`player-${player.color}`}
        alignItems="center"
        classes={{ selected: classes.listItemSelected }}
        selected={!finished && playerSelected && playerSelected.color === player.color}
        onClick={handleListItemClick && handleListItemClick(player)}
        divider
        button
      >
        <ListItemIcon className={classes.listItemIcon}>
          {getItemIcon(player, user, isMe, finished, classes)}
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={player.name}
          secondary={`${player.score || 0}pt`}
        />
        {showRedeem && (
          <Button color="primary" variant="outlined" onClick={onRedeem && onRedeem(player)}>
            Redeem
          </Button>
        )}
      </ListItem>
    );
  }
}
