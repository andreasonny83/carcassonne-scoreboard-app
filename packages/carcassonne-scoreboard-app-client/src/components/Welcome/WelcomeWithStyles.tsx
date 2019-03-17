import React from 'react';
import { styled } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Button, withStyles, WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';

import { WelcomeComponent } from './Welcome';

const StyledLink = styled(Link)({
  color: 'inherit',
});

export const ButtonLink = (props: any) => (
  <Button variant="outlined" color="primary" {...props}>
    <StyledLink to={'/app/game/new'} {...props} />
  </Button>
);

const styles = ({ spacing }: Theme) => ({
  mainFeaturedPost: {
    marginBottom: spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${spacing.unit * 6}px`,
  },
  row: {
    marginBottom: '1rem',
  },
  form: {
    maxWidth: '500px',
    marginTop: '2em',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em 0.5em',
  },
  joinGame: {
    marginTop: '3em',
    marginBottom: '0.75em',
  },
});

export type WelcomeStylesProps = WithStyles<typeof styles>;

export const WelcomeWithStyles = withStyles(styles)(WelcomeComponent);
