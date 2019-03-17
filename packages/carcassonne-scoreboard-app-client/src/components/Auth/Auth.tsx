import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { Typography, Card, CardContent, Avatar, Grid, CardHeader } from '@material-ui/core';
import { Lock } from '@material-ui/icons';

import { SignInData, VerifyCodeData } from '../../actions';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { CodeConfirmationForm } from './CodeConfirmationForm';
import { ResetPasswordFormForm } from './ResetPasswordForm';
import { IAuthWithStyles } from './AuthWithStyles';

interface AuthProps extends IAuthWithStyles {
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
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={12}>
          {showCodeConfirmation && email && (
            <Card className={classes.card}>
              <CardHeader
                disableTypography={true}
                title={
                  <Typography component="h2" variant="h5" className={classes.header}>
                    <Avatar className={classes.avatar}>
                      <Lock />
                    </Avatar>
                    Awaiting Confirmation
                  </Typography>
                }
              />
              <CardContent className={classes.card}>
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
              </CardContent>
            </Card>
          )}

          {showForgotPassword && email && (
            <Card className={classes.card}>
              <CardHeader
                disableTypography={true}
                title={
                  <Typography component="h2" variant="h5" className={classes.header}>
                    <Avatar className={classes.avatar}>
                      <Lock />
                    </Avatar>
                    Did you forget your password?
                  </Typography>
                }
              />
              <CardContent className={classes.card}>
                <ResetPasswordFormForm
                  classes={classes}
                  email={email}
                  toggleLoading={toggleLoading}
                  loading={loading}
                  onUndo={this.undo}
                  onResetPassword={resetPassword}
                  showNotification={showNotification}
                />
              </CardContent>
            </Card>
          )}

          {!showForgotPassword && !showCodeConfirmation && !showRegister && (
            <Card className={classes.card}>
              <CardHeader
                disableTypography={true}
                title={
                  <Typography component="h2" variant="h5" className={classes.header}>
                    <Avatar className={classes.avatar}>
                      <Lock />
                    </Avatar>
                    Sign in
                  </Typography>
                }
              />
              <CardContent className={classes.card}>
                <LoginForm
                  classes={classes}
                  onLogin={signIn}
                  onCodeRequired={verifyUser}
                  showNotification={showNotification}
                  onForgotPassword={forgotPassword}
                  loading={loading}
                  toggleLoading={toggleLoading}
                  onShowRegister={this.showRegister}
                />
              </CardContent>
            </Card>
          )}
          {!showCodeConfirmation && showRegister && (
            <Card className={classes.card}>
              <CardHeader
                disableTypography={true}
                title={
                  <Typography component="h2" variant="h5" className={classes.header}>
                    <Avatar className={classes.avatar}>
                      <Lock />
                    </Avatar>
                    Register
                  </Typography>
                }
              />

              <CardContent className={classes.card}>
                <RegistrationForm
                  classes={classes}
                  onRegister={signUp}
                  toggleLoading={toggleLoading}
                  loading={loading}
                  onBackToLogin={this.showLogin}
                />
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
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
