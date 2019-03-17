import { connect } from 'react-redux';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/styles';
import { Link, IconButton, Avatar } from '@material-ui/core';

import { signOut } from '../../actions';
import { HeaderComponent } from './Header';

export const TitleLink = styled(RouterLink)({
  textDecoration: 'none',
});

export const StyledRouterLink = styled(RouterLink)({
  textDecoration: 'none',
  display: 'block',
  paddingLeft: '1rem',
  paddingRight: '1rem',
});

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  display: 'block',
  paddingLeft: '1rem',
  paddingRight: '1rem',
});

export const StyledIconButton = styled(IconButton)({
  padding: '4px',
});

export const StyledAvatar = styled(Avatar)({
  width: '36px',
  height: '36px',
});

const styles = ({ palette, spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${palette.grey[400]}`,
      marginBottom: spacing.unit * 2,
      [breakpoints.up('sm')]: {
        marginBottom: spacing.unit * 4,
      },
    },
    menuItem: {
      color: palette.primary.main,
    },
    title: {
      flexGrow: 1,
    },
    titleLink: {
      color: palette.secondary.main,
    },
  });

const mapStateToProps = (state: any) => ({
  isSignedIn: state.auth.isSignedIn,
});

const mapDispatchToProps = {
  signOut,
};

export type WithStylesProps = WithStyles<typeof styles>;

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HeaderComponent));
