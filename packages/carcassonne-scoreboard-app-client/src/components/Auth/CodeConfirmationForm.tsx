import React, { PureComponent } from 'react';

import {
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  Link,
  Button,
  CardContent,
  Card,
  CardActions,
} from '@material-ui/core';
import { Lock } from '@material-ui/icons';

import { VerifyCodeData } from '../../actions';

interface CodeConfirmationState {
  code: string;
  formCode?: any;
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
      <Card className={classes.card}>
        <CardContent className={classes.card}>
          <Avatar className={classes.avatar}>
            <Lock />
          </Avatar>

          <Typography component="h1" variant="h5">
            Awaiting Confirmation
          </Typography>

          <Typography variant="caption">We sent an email to {email}</Typography>

          <form onSubmit={this.handleSubmit(email)} className={classes.form}>
            <FormControl margin="normal" variant="outlined" required fullWidth>
              <InputLabel htmlFor="password">Enter the confirmation code</InputLabel>
              <OutlinedInput
                inputRef={el => {
                  this.setState({ formCode: el });
                }}
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
          </form>

          <Typography>
            <Link component="button" onClick={this.newCode(email)}>
              Send me a new confirmation code
            </Link>
          </Typography>
        </CardContent>

        <CardActions>
          <Link component="button" onClick={onUndo}>
            undo
          </Link>
        </CardActions>
      </Card>
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
