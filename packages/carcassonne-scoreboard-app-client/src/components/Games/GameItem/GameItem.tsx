import React, { PureComponent } from 'react';
import { ListItem, ListItemText, Button, ListItemSecondaryAction } from '@material-ui/core';
import { GameItemStylesProps } from './GameItemWithStyles';

type GameItemProps = GameItemStylesProps & {
  gameId: string;
  date: string;
  inProgress: boolean;
  onJoin?(gameId: string): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export class GameItem extends PureComponent<GameItemProps> {
  public render() {
    const { classes, gameId, date, inProgress, onJoin } = this.props;

    return (
      <ListItem
        classes={{ root: classes.listItemRoot }}
        key={`game-${gameId}`}
        alignItems="center"
        divider
        button
      >
        <ListItemText
          className={classes.listItemText}
          primary={gameId}
          secondary={inProgress ? false : `Created ${date}`}
        />
        <ListItemSecondaryAction>
          <Button color="primary" variant="outlined" onClick={onJoin && onJoin(gameId)}>
            Go
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
