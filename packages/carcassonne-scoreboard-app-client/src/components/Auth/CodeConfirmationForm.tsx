import React, { PureComponent } from 'react';
import { Typography, FormControl, InputLabel, OutlinedInput, Button } from '@material-ui/core';

import { VerifyCodeData } from '../../actions';

interface CodeConfirmationState {
  code: string;
}

interface CodeConfirmationProps {
  classes: any;
  email: string;
  loading: boolean;
  toggleLoading: (loadingState: boolean) => void;
  verifyCode: (data: VerifyCodeData) => void;
  sendNewCode: (data: { username: string }) => void;
  onUndo: () => void;
  onLoaded: () => void;
}

const initialState: CodeConfirmationState = {
  code: '',
};

export class CodeConfirmationForm extends PureComponent<
  CodeConfirmationProps,
  CodeConfirmationState
> {
  public readonly state: CodeConfirmationState = initialState;

  public componentDidMount() {
    const { toggleLoading, onLoaded } = this.props;
    toggleLoading(false);
    onLoaded();
  }

  public render(): JSX.Element {
    const { email, loading, onUndo, classes } = this.props;
    const { code } = this.state;

    return (
      <form onSubmit={this.handleSubmit(email)} className={classes.form}>
        <Typography variant="caption">We sent an email to {email}</Typography>

        <FormControl margin="normal" variant="outlined" required fullWidth>
          <InputLabel htmlFor="password">Enter the confirmation code</InputLabel>
          <OutlinedInput
            id="code"
            name="code"
            autoComplete="current-password"
            type="text"
            value={code}
            disabled={loading}
            onChange={this.handleChange}
            labelWidth={240}
            fullWidth
            required
            autoFocus
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
          Verify
        </Button>

        <Button
          onClick={this.newCode(email)}
          variant="text"
          color="primary"
          className={classes.actionButton}
          fullWidth
        >
          Send me a new confirmation code
        </Button>
        <Button color="secondary" onClick={onUndo} variant="text" fullWidth>
          Undo
        </Button>
      </form>
    );
  }

  private handleSubmit = (email: string) => async (event: React.FormEvent<HTMLFormElement>) => {
    const { toggleLoading, verifyCode } = this.props;
    const { code } = this.state;

    const data = {
      username: email.toString().trim(),
      code: code.toString().trim(),
    };

    event.preventDefault();
    toggleLoading(true);

    verifyCode({
      username: data.username,
      code: data.code,
    });
  };

  private newCode = (email: string) => async (event: React.MouseEvent) => {
    const { toggleLoading, sendNewCode } = this.props;

    const data: { username: string } = {
      username: email.toString().trim(),
    };

    event.preventDefault();
    toggleLoading(true);

    sendNewCode(data);
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const name: string = target && target.name;
    const value: string = target && target.value;

    event.preventDefault();

    this.setState((currState: CodeConfirmationState) => ({
      ...currState,
      [name]: value,
    }));
  };
}
