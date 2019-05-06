import React, { PureComponent } from 'react';
import { Typography } from '@material-ui/core';
import { FooterWithStyles } from './FooterWithStyles';
import { version } from '../../../package.json';

type FooterProps = FooterWithStyles;

export class FooterComponent extends PureComponent<FooterProps> {
  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Carcassonne Scoreboard v{version}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Copyright &copy; 2019
        </Typography>
      </footer>
    );
  }
}
