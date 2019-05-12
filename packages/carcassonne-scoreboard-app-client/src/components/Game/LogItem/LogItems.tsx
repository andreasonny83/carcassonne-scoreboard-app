import React, { PureComponent } from 'react';
import { List } from '@material-ui/core';

import { LogItemsStylesProps } from './LogItemsWithStyles';
import { LogItemWithStyles as LogItem } from './LogItemsWithStyles';
import { Log } from '../Game.container';

type LogItemsProps = LogItemsStylesProps & {
  items: Log[];
};

export class LogItems extends PureComponent<LogItemsProps> {
  public render() {
    const { classes, items } = this.props;
    const sortedItems = items.reverse();

    return (
      <List className={classes.root}>
        {sortedItems.map((log: Log) => (
          <LogItem
            key={`LogItem-${log.id}`}
            logId={log.id}
            color={log.color}
            score={log.score}
            points={log.points}
            userId={log.userId}
          />
        ))}
      </List>
    );
  }
}
