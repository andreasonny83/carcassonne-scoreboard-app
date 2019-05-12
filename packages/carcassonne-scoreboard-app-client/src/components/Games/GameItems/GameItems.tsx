import React, { PureComponent } from 'react';
import { List } from '@material-ui/core';

import { GameItemsStylesProps } from './GameItemsWithStyles';
import { GameItem } from '../GameItem';
import { UserGame } from '../Games.container';

type GameItemsProps = GameItemsStylesProps & {
  games: UserGame[];
  onJoin?(gameId: string): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export class GameItems extends PureComponent<GameItemsProps> {
  public render() {
    const { classes, games, onJoin } = this.props;

    return (
      <List className={classes.root}>
        {games.map((game: UserGame) => (
          <GameItem
            key={`GameItem-${game.gameId}`}
            gameId={game.gameId}
            date={game.date}
            inProgress={!game.finished}
            onJoin={onJoin}
          />
        ))}
      </List>
    );
  }
}
