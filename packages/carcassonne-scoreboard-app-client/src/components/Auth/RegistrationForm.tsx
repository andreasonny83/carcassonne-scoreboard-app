import React, { PureComponent } from 'react';

import { FormControl, InputLabel, OutlinedInput, Button } from '@material-ui/core';
import { IAuthWithStyles } from './AuthWithStyles';

interface RegistrationFormState {
  username: string;
  password: string;
}

interface RegistrationFormProps extends IAuthWithStyles {
  loading: boolean;
  onRegister: (data: any) => void;
  toggleLoading(status: boolean): void;
}

const initialState: RegistrationFormState = {
  username: '',
  password: '',
};

export class RegistrationForm extends PureComponent<RegistrationFormProps, RegistrationFormState> {
  public readonly state: RegistrationFormState = initialState;

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
          disabled={loading}
          className={classes.submit}
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

    this.setState(
      (prevState: RegistrationFormState): RegistrationFormState => ({
        ...prevState,
        [name]: value,
      })
    );

    event.preventDefault();
  };
}
