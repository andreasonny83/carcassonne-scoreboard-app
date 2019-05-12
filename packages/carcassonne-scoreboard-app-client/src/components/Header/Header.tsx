import React, { PureComponent } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Avatar } from 'react-avataaars';

import { UserState } from '../../reducers/user';
import {
  WithStylesProps,
  TitleLink,
  StyledIconButton,
  StyledRouterLink,
  StyledLink,
} from './HeaderWithStyles';

interface HeaderProps extends WithStylesProps {
  width: Breakpoint;
  appName: string;
  isSignedIn: boolean;
  user: UserState;
  signOut(): void;
}

interface HeaderState {
  anchorEl: any;
}

const initialState: HeaderState = {
  anchorEl: null,
};

export class Header extends PureComponent<HeaderProps, HeaderState> {
  public readonly state: HeaderState = initialState;

  public render(): JSX.Element {
    const { appName, signOut, isSignedIn, user, width, classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={`Header ${classes.root}`}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="secondary" className={classes.title}>
              <TitleLink className={classes.titleLink} to="/app">
                {appName}
              </TitleLink>
            </Typography>

            {isSignedIn && (
              <div>
                <StyledIconButton
                  aria-owns={anchorEl ? 'user-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenuOpen}
                >
                  <div className={classes.avatarWrapper}>
                    {user.picture && (
                      <Avatar
                        size={isWidthUp('sm', width) ? '50px' : '40px'}
                        hash={user.picture}
                        className={classes.avatar}
                      />
                    )}
                  </div>
                </StyledIconButton>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorEl)}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem disableGutters onClick={this.handleMenuClose}>
                    <StyledRouterLink className={classes.menuItem} to={`/app/user/games`}>
                      My Games
                    </StyledRouterLink>
                  </MenuItem>
                  <MenuItem disableGutters onClick={this.handleMenuClose}>
                    <StyledRouterLink className={classes.menuItem} to={`/app/user/profile`}>
                      Profile
                    </StyledRouterLink>
                  </MenuItem>
                  <MenuItem disableGutters onClick={this.handleMenuClose}>
                    <StyledLink underline="none" onClick={signOut}>
                      Sign Out
                    </StyledLink>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  private handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  private handleMenuOpen = (event: React.MouseEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };
}
