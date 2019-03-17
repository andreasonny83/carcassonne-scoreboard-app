import React, { PureComponent } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@material-ui/core';

import {
  WithStylesProps,
  TitleLink,
  StyledIconButton,
  StyledAvatar,
  StyledRouterLink,
  StyledLink,
} from './HeaderWithStyles';

interface HeaderProps extends WithStylesProps {
  appName: string;
  isSignedIn: boolean;
  signOut(): void;
}

interface HeaderState {
  anchorEl: any;
}

const initialState: HeaderState = {
  anchorEl: null,
};

export class HeaderComponent extends PureComponent<HeaderProps, HeaderState> {
  public readonly state: HeaderState = initialState;

  public render(): JSX.Element {
    const { appName, signOut, isSignedIn, classes } = this.props;
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
                  <StyledAvatar
                    alt="User avatar"
                    src="https://avatars1.githubusercontent.com/u/8806300?s=460&v=4"
                  />
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
