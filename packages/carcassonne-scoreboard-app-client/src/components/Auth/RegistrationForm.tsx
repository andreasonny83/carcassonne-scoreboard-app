import React, { PureComponent } from 'react';

import { FormControl, InputLabel, OutlinedInput, Button, FormHelperText } from '@material-ui/core';
import { IAuthWithStyles } from './AuthWithStyles';

interface RegistrationFormProps extends IAuthWithStyles {
  loading: boolean;
  onRegister: (data: any) => void;
  toggleLoading(status: boolean): void;
}

interface RegistrationFormState {
  username: string;
  password: string;
  usernameValid: boolean;
  passwordValid: boolean;
  pristine: boolean;
}

const initialState: RegistrationFormState = {
  username: '',
  password: '',
  usernameValid: false,
  passwordValid: false,
  pristine: true,
};

export class RegistrationForm extends PureComponent<RegistrationFormProps, RegistrationFormState> {
  public readonly state: RegistrationFormState = initialState;

  public render(): JSX.Element {
    const { loading, classes } = this.props;
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
            autoComplete="username"
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
            type="password"
            value={password}
            disabled={loading}
            onChange={this.handleChange}
            labelWidth={90}
          />
          <FormHelperText hidden={pristine || passwordValid}>
            Password should be at least 8 characters long, with at least 1 uppercase, 1 lowercase
            character amd 1 number
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit}
          disabled={loading || !passwordValid || !usernameValid}
        >
          Register
        </Button>
      </form>
    );
  }

  public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { toggleLoading, onRegister } = this.props;
    const { username, password } = this.state;

    const data = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

    event.preventDefault();
    toggleLoading(true);

    onRegister({
      ...data,
      attributes: {
        nickname: data.username,
      },
    });
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
      const re: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      isPasswordValid = re.test(String(value));
    }

    this.setState(
      (prevState: RegistrationFormState): RegistrationFormState => ({
        ...prevState,
        [name]: value,
        ...(name === 'username' && { usernameValid: isUsernameValid }),
        ...(name === 'password' && { passwordValid: isPasswordValid }),
        pristine: false,
      })
    );
  };
}
