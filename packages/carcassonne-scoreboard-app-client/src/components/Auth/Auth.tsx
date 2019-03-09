import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';

import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from '@material-ui/core';
import { Lock } from '@material-ui/icons';

import { SignInData, VerifyCodeData } from '../../actions';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { CodeConfirmationForm } from './CodeConfirmationForm';
import { ResetPasswordFormForm } from './ResetPasswordForm';
import { IAuthWithStyles } from './AuthWithStyles';

interface AuthProps extends IAuthWithStyles {
  appName: string;
  email?: string | null;
  auth: any;
  sendNewCode: (data: { username: string }) => void;
  signIn(data: SignInData): void;
  signUp(data: any): void;
  toggleLoading(status: boolean): void;
  verifyUser(email: string): void;
  verifyCode(data: VerifyCodeData): void;
  forgotPassword(username: string): void;
  resetPassword(username: string, code: string, newPassword: string): void;
  undoCodeVerification(): void;
  showNotification(message: string, timeout?: number): void;
}

interface AuthState {
  readonly showRegister: boolean;
}

const initialState: AuthState = {
  showRegister: false,
};

export class AuthComponent extends PureComponent<AuthProps, AuthState> {
  public readonly state: AuthState = initialState;

  public componentDidMount() {
    const { toggleLoading } = this.props;

    toggleLoading(false);
  }

  public render(): JSX.Element {
    const { showRegister } = this.state;
    const {
      appName,
      signIn,
      signUp,
      auth,
      verifyCode,
      forgotPassword,
      resetPassword,
      sendNewCode,
      toggleLoading,
      verifyUser,
      showNotification,
      classes,
    } = this.props;
    const { showCodeConfirmation, email, isSignedIn, showForgotPassword, loading } = auth;

    if (isSignedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="Auth">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {appName}
            </Typography>
          </Toolbar>
        </AppBar>

        <main className={classes.main}>
          {showCodeConfirmation && email && (
            <CodeConfirmationForm
              classes={classes}
              email={email}
              onLoaded={this.showLogin}
              toggleLoading={toggleLoading}
              loading={loading}
              onUndo={this.undo}
              verifyCode={verifyCode}
              sendNewCode={sendNewCode}
            />
          )}

          {showForgotPassword && email && (
            <ResetPasswordFormForm
              classes={classes}
              email={email}
              toggleLoading={toggleLoading}
              loading={loading}
              onUndo={this.undo}
              onResetPassword={resetPassword}
              showNotification={showNotification}
            />
          )}

          {!showForgotPassword && !showCodeConfirmation && !showRegister && (
            <Card className={classes.card}>
              <CardContent className={classes.card}>
                <Avatar className={classes.avatar}>
                  <Lock />
                </Avatar>

                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>

                <LoginForm
                  classes={classes}
                  onLogin={signIn}
                  onCodeRequired={verifyUser}
                  showNotification={showNotification}
                  onForgotPassword={forgotPassword}
                  loading={loading}
                  toggleLoading={toggleLoading}
                />
              </CardContent>

              <CardActions>
                <Link component="button" onClick={this.showRegister}>
                  Register
                </Link>
              </CardActions>
            </Card>
          )}
          {!showCodeConfirmation && showRegister && (
            <Card className={classes.card}>
              <CardContent className={classes.card}>
                <Avatar className={classes.avatar}>
                  <Lock />
                </Avatar>

                <Typography component="h1" variant="h5">
                  Register
                </Typography>

                <RegistrationForm
                  classes={classes}
                  onRegister={signUp}
                  toggleLoading={toggleLoading}
                  loading={loading}
                />
              </CardContent>

              <CardActions>
                <Link component="button" onClick={this.showLogin}>
                  Back to Login
                </Link>
              </CardActions>
            </Card>
          )}
        </main>
      </div>
    );
  }

  private undo = () => {
    const { undoCodeVerification } = this.props;

    undoCodeVerification();
  };

  private showRegister = () => {
    this.setState({
      showRegister: true,
    });
  };

  private showLogin = () => {
    this.setState({
      showRegister: false,
    });
  };
}
