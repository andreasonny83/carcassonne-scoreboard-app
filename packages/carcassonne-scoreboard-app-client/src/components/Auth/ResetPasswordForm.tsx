import React, { PureComponent } from 'react';

import {
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
} from '@material-ui/core';

interface ResetPasswordFormProps {
  classes: any;
  email: string;
  loading: boolean;
  onUndo: () => void;
  toggleLoading: (loadingState: boolean) => void;
  onResetPassword(username: string, code: string, newPassword: string): void;
  showNotification(message: string, timeout?: number): void;
}

interface ResetPasswordFormState {
  code: string;
  password: string;
  codeValid: boolean;
  passwordValid: boolean;
  pristine: boolean;
}

const initialState: ResetPasswordFormState = {
  code: '',
  password: '',
  codeValid: false,
  passwordValid: false,
  pristine: true,
};

export class ResetPasswordFormForm extends PureComponent<
  ResetPasswordFormProps,
  ResetPasswordFormState
> {
  public readonly state: ResetPasswordFormState = initialState;

  public componentDidMount() {
    const { toggleLoading } = this.props;
    toggleLoading(false);
  }

  public render(): JSX.Element {
    const { email, loading, onUndo, classes } = this.props;
    const { code, password, codeValid, passwordValid, pristine } = this.state;

    return (
      <form onSubmit={this.handleSubmit(email)} className={classes.form}>
        <Typography variant="caption">We sent an email to {email}</Typography>

        <FormControl
          margin="normal"
          variant="outlined"
          required
          fullWidth
          error={!pristine && !passwordValid}
        >
          <InputLabel htmlFor="password">New Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type="password"
            value={password}
            disabled={loading}
            onChange={this.handleChange}
            labelWidth={130}
            autoFocus
          />
          <FormHelperText>
            Password should be at least 8 characters long, with at least 1 uppercase, 1 lowercase
            character amd 1 number
          </FormHelperText>
        </FormControl>

        <FormControl
          margin="normal"
          variant="outlined"
          required
          fullWidth
          error={!pristine && !codeValid}
        >
          <InputLabel htmlFor="code">Enter the confirmation code</InputLabel>
          <OutlinedInput
            id="code"
            name="code"
            type="text"
            value={code}
            disabled={loading}
            onChange={this.handleChange}
            labelWidth={240}
            fullWidth
            required
          />
        </FormControl>
        <FormHelperText hidden={pristine || codeValid}>
          A valid code should be 6 digit long
        </FormHelperText>

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit}
          disabled={loading || !passwordValid || !codeValid}
        >
          Reset Password
        </Button>

        <Button
          onClick={onUndo}
          variant="text"
          color="secondary"
          className={classes.actionButton}
          fullWidth
        >
          Undo
        </Button>
      </form>
    );
  }

  private handleSubmit = (email: string) => async (event: React.FormEvent<HTMLFormElement>) => {
    const { toggleLoading, onResetPassword } = this.props;
    const { code, password } = this.state;

    event.preventDefault();
    toggleLoading(true);

    const data = {
      username: email.toString().trim(),
      password: password.toString().trim(),
      code: code.toString().trim(),
    };

    onResetPassword(data.username, data.code, data.password);
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const name: string = target && target.name;
    const value: string = target && target.value;
    let isCodeValid: boolean = false;
    let isPasswordValid: boolean = false;

    if (name === 'code') {
      const re: RegExp = /^\d{6}$/;
      isCodeValid = re.test(String(value));
    }

    if (name === 'password') {
      const re: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      isPasswordValid = re.test(String(value));
    }

    event.preventDefault();

    this.setState((currState: ResetPasswordFormState) => ({
      ...currState,
      [name]: value,
      ...(name === 'code' && { codeValid: isCodeValid }),
      ...(name === 'password' && { passwordValid: isPasswordValid }),
      pristine: false,
    }));
  };
}
