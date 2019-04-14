import React from 'react';
import { styled } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Button, withStyles, WithStyles, Theme } from '@material-ui/core';

import { NewGameComponent } from './NewGame';

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
    padding: `${spacing.unit * 2}px ${spacing.unit}px`,
    marginBottom: spacing.unit * 2,
  },
  form: {
    maxWidth: '500px',
    width: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em 0.5em',
  },
  formControl: {
    margin: spacing.unit,
  },
});

export type NewGameStylesProps = WithStyles<typeof styles>;

export const NewGameWithStyles = withStyles(styles)(NewGameComponent);
