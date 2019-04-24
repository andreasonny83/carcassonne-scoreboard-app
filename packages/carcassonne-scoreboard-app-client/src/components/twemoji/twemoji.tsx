import React, { PureComponent } from 'react';
import twemoji from 'twemoji';

import { Typography } from '@material-ui/core';
import { twemojiWithStyles } from './twemojiWithStyles';

export interface TwemojiProps extends twemojiWithStyles {
  copy: string;
  size?: number;
}

export class Twemoji extends PureComponent<TwemojiProps> {
  public render() {
    const { copy, classes } = this.props;

    const parsedCopy = twemoji.parse(String(copy), {
      base: '/',
      folder: 'svg',
      ext: '.svg',
    });

    return <Typography id="notification-message" align="center" className={classes.message} dangerouslySetInnerHTML={{ __html: parsedCopy }} />;
  }
}
