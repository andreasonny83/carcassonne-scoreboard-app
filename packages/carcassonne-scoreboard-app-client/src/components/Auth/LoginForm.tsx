import React, { PureComponent } from 'react';

import { SignInData } from '../../actions';
import { FormControl, InputLabel, OutlinedInput, Button } from '@material-ui/core';
import { IAuthWithStyles } from './AuthWithStyles';

interface LoginFormProps extends IAuthWithStyles {
  loading: boolean;
  onLogin(data: SignInData): void;
  onCodeRequired(username: string): void;
  toggleLoading(status: boolean): void;
}

interface LoginFormState {
  username: string;
  password: string;
}

const initialState: LoginFormState = {
  username: '',
  password: '',
};

export class LoginForm extends PureComponent<LoginFormProps, LoginFormState> {
  public readonly state: LoginFormState = initialState;

  public render(): JSX.Element {
    const { loading, classes } = this.props;
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={classes.form}>
        <FormControl margin="normal" variant="outlined" required fullWidth>
          <InputLabel htmlFor="email" variant="outlined">
            Email Address
          </InputLabel>
          <OutlinedInput
            id="email"
            name="username"
            autoComplete="email"
            type="email"
            value={username}
            disabled={loading}
            onChange={this.handleChange}
            labelWidth={130}
            autoFocus
          />
        </FormControl>

        <FormControl margin="normal" variant="outlined" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            autoComplete="current-password"
            type="password"
            value={password}
            disabled={loading}
            onChange={this.handleChange}
            labelWidth={90}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          Sign in
        </Button>
      </form>
    );
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const name: string = target && target.name;
    const value: string = target && target.value;

    event.preventDefault();

    this.setState(
      (prevState: LoginFormState): LoginFormState => ({
        ...prevState,
        [name]: value,
      })
    );
  };
}
