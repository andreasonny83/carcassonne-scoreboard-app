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
  formPlayerControl: {
    margin: spacing.unit,
    flexFlow: 'row',
    alignItems: 'center',
  },
  playerSelect: {
    flex: '1 1 auto',
  },
  meeple: {
    margin: '0 0.2em',
    stroke: 'black',
    strokeWidth: '5px',
    ['stroke-opacity']: '0.75',
  },
  deleteContainer: {
    'text-align': 'center',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ef2323',
    },
  },
});

export type NewGameStylesProps = WithStyles<typeof styles>;

export const NewGameWithStyles = withStyles(styles)(NewGameComponent);
