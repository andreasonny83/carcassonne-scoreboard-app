import React, { PureComponent } from 'react';
import { List } from '@material-ui/core';
import { v1 } from 'uuid';

import { Player } from '..';
import { PlayerItemWithStyles as PlayerItem } from './PlayerItemWithStyles';
import { UserState } from '../../../reducers/user';

interface PlayerItemsProps {
  items: any[];
  user: UserState;
  finished: boolean;
  itemSelected?: Player;
  showRedeem?: boolean;
  disabled?: boolean;
  handleListItemClick?(player: Player): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onRedeem?(player: Player): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export class PlayerItems extends PureComponent<PlayerItemsProps> {
  public render() {
    const {
      items,
      itemSelected,
      showRedeem,
      disabled,
      finished,
      handleListItemClick,
      onRedeem,
      user,
    } = this.props;

    return (
      <List>
        {items.map((item: Player) => (
          <PlayerItem
            key={`PlayerItem-${v1()}`}
            player={item}
            isMe={item.userId === user.username}
            user={user}
            playerSelected={itemSelected}
            showRedeem={showRedeem}
            disabled={disabled}
            finished={finished}
            handleListItemClick={handleListItemClick}
            onRedeem={onRedeem}
          />
        ))}
      </List>
    );
  }
}
