import React from 'react';
import { styled } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Button, withStyles, WithStyles, Theme } from '@material-ui/core';

import { NewGame } from './NewGame';

const StyledLink = styled(Link)({
  color: 'inherit',
});

export const ButtonLink = (props: any) => (
  <Button variant="outlined" color="primary" {...props}>
    <StyledLink to={'/app/game/new'} {...props} />
  </Button>
);

const styles = ({ spacing }: Theme) => ({
  root: {
    padding: spacing(2, 1),
    marginBottom: spacing(2),
  },
  container: {
    maxWidth: '500px',
    marginTop: '2em',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formControl: {
    margin: spacing(1),
  },
  gameName: {
    marginBottom: spacing(1),
  },
  gameNameDescription: {
    marginBottom: spacing(1),
  },
});

export type NewGameStylesProps = WithStyles<typeof styles>;

export const NewGameWithStyles = withStyles(styles)(NewGame);
