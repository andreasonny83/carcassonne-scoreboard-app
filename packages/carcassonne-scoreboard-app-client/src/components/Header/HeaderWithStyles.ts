import { Link as RouterLink } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';
import { Link, IconButton } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

import { Header } from './Header';

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

const styles = ({ palette, spacing, breakpoints }: Theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${palette.grey[400]}`,
      marginBottom: spacing(2),
      [breakpoints.up('sm')]: {
        marginBottom: spacing(4),
      },
    },
    menuItem: {
      color: palette.primary.main,
    },
    title: {
      flexGrow: 1,
      fontSize: '1.2rem',
      [breakpoints.up('sm')]: {
        fontSize: '1.4rem',
      },
    },
    titleLink: {
      color: palette.secondary.main,
    },
    avatarWrapper: {
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.8)',
      overflow: 'hidden',
    },
    avatar: {
      position: 'relative',

      '& svg': {
        filter: 'drop-shadow(1px -1px 1px rgba(0,0,0,0.3))',
      }
    },
  });

export type WithStylesProps = WithStyles<typeof styles>;

export const HeaderWithStyles = withStyles(styles)(withWidth()(Header));
