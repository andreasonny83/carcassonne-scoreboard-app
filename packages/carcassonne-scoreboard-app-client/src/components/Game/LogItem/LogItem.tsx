import React, { PureComponent } from 'react';
import { v1 } from 'uuid';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { LogItemStylesProps } from './LogItemsWithStyles';
import { Meeple, mapColor, MeepleColor } from '../../Icons';

type LogItemProps = LogItemStylesProps & {
  logId: string;
  score: string;
  points: string;
  userId: string;
  color: MeepleColor;
};

export class LogItem extends PureComponent<LogItemProps> {
  public render() {
    const { classes, logId, score, points, color } = this.props;

    const date = new Date(Number(logId)).toLocaleTimeString();

    return (
      <ListItem dense key={`player-${v1()}`} alignItems="center" divider button>
        <ListItemIcon>
          <Meeple className={classes.meeple} fontSize="1.4em" color={mapColor.get(color)} />
        </ListItemIcon>
        <ListItemText primary={`+${points} Points`} secondary={`New Score: ${score}`} />
        <ListItemText className={classes.dateItem} secondary={`At: ${date}`} />
      </ListItem>
    );
  }
}
