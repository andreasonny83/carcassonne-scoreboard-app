import React, { PureComponent } from 'react';
import {
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  Button,
  Link,
} from '@material-ui/core';

import { SignInData } from '../../actions';
import { IAuthWithStyles } from './AuthWithStyles';

interface LoginFormProps extends IAuthWithStyles {
  loading: boolean;
  onLogin(data: SignInData): void;
  onForgotPassword(username: string): void;
  onCodeRequired(username: string): void;
  toggleLoading(status: boolean): void;
  showNotification(message: string, timeout?: number): void;
  onShowRegister(): void;
}

interface LoginFormState {
  username: string;
  password: string;
  usernameValid: boolean;
  passwordValid: boolean;
  pristine: boolean;
}

const initialState: LoginFormState = {
  username: '',
  password: '',
  usernameValid: false,
  passwordValid: false,
  pristine: true,
};

export class LoginForm extends PureComponent<LoginFormProps, LoginFormState> {
  public readonly state: LoginFormState = initialState;

  public render(): JSX.Element {
    const { loading, onShowRegister, classes } = this.props;
    const { username, password, usernameValid, passwordValid, pristine } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={classes.form}>
        <FormControl
          margin="normal"
          variant="outlined"
          required
          fullWidth
          error={!pristine && !usernameValid}
        >
          <InputLabel htmlFor="username" variant="outlined">
            Email Address
          </InputLabel>
          <OutlinedInput
            id="username"
            name="username"
            autoComplete="email"
            type="email"
            value={username}
            disabled={loading}
            onChange={this.handleChange}
            labelWidth={130}
            autoFocus
          />
          <FormHelperText hidden={pristine || usernameValid}>
            Enter a valid email address
          </FormHelperText>
          <FormHelperText>
            <Link color="primary" tabIndex={-1} href="" onClick={this.resetPasswordHandler}>
              Forgot your password?
            </Link>
          </FormHelperText>
        </FormControl>

        <FormControl
          margin="normal"
          variant="outlined"
          required
          fullWidth
          error={!pristine && !passwordValid}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            autoComplete="password"
            type="password"
            value={password}
            disabled={loading}
            onChange={this.handleChange}
            labelWidth={90}
          />
          <FormHelperText hidden={pristine || passwordValid}>
            Password should be at least 8 characters long
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.submit}
          disabled={loading || !passwordValid || !usernameValid}
          fullWidth
        >
          Sign in
        </Button>

        <Button
          onClick={onShowRegister}
          variant="text"
          color="primary"
          className={classes.actionButton}
          fullWidth
        >
          Register
        </Button>
      </form>
    );
  }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const { username, password } = this.state;
    const { onLogin, toggleLoading } = this.props;

    const data = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

    event.preventDefault();
    toggleLoading(true);

    onLogin(data);
  };

  private resetPasswordHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    const { onForgotPassword, showNotification } = this.props;
    const { username } = this.state;

    event.preventDefault();

    if (username) {
      return onForgotPassword(username);
    }

    this.setState({
      pristine: false,
    });

    showNotification('Please, enter a valid email address first');
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const name: string = target && target.name;
    const value: string = target && target.value;
    let isUsernameValid: boolean;
    let isPasswordValid: boolean;

    event.preventDefault();

    if (name === 'username') {
      const re: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isUsernameValid = re.test(String(value).toLowerCase());
    }

    if (name === 'password') {
      isPasswordValid = !!value.length && value.length >= 8;
    }

    this.setState(
      (prevState: LoginFormState): LoginFormState => ({
        ...prevState,
        [name]: value,
        ...(name === 'username' && { usernameValid: isUsernameValid }),
        ...(name === 'password' && { passwordValid: isPasswordValid }),
        pristine: false,
      })
    );
  };
}
