import React, { PureComponent } from 'react';
import { AppContext, IAppContext } from '../PrivateRouter/app.context';
import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Link, Menu, MenuItem, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { WithStylesProps } from './HeaderWithStyles';

const StyledLink = styled(RouterLink)({
  textDecoration: 'none',
});

interface HeaderProps extends WithStylesProps {
  onSignOut(): void;
}

interface HeaderState {
  anchorEl: any;
}

const initialState: HeaderState = {
  anchorEl: null,
};

export class HeaderComponent extends PureComponent<HeaderProps, HeaderState> {
  public static contextType: React.Context<IAppContext> = AppContext;
  public readonly state: HeaderState = initialState;
  public context!: React.ContextType<typeof AppContext>;

  public render(): JSX.Element {
    const { onSignOut, classes } = this.props;
    const { anchorEl } = this.state;
    const { app } = this.context;

    return (
      <div className={`Header ${classes.root}`}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              <StyledLink to="/app">{app.appName}</StyledLink>
            </Typography>

            <div>
              <IconButton
                aria-owns={anchorEl ? 'user-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuOpen}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.handleMenuClose}>
                  <StyledLink className={classes.menuItem} to={`/app/user/profile`}>
                    Profile
                  </StyledLink>
                </MenuItem>
                <MenuItem onClick={this.handleMenuClose}>
                  <Link underline="none" onClick={onSignOut}>
                    Sign Out
                  </Link>
                </MenuItem>
              </Menu>
            </div>
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
