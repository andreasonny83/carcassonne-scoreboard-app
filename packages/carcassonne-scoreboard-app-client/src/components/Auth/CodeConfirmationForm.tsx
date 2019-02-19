import React, { PureComponent } from 'react';
import axios from 'axios';
import Auth from '@aws-amplify/auth';
import { API_URL } from '../../config';

interface CodeConfirmationState {
  code: string;
}

interface CodeConfirmationProps {
  email: string;
  loading: boolean;
  undo: () => void;
  toggleLoading: (loadingState: boolean) => void;
  onConfirmed: () => void;
}

const initialState: CodeConfirmationState = {
  code: '',
};

export class CodeConfirmationForm extends PureComponent<CodeConfirmationProps, CodeConfirmationState> {
  public readonly state: CodeConfirmationState = initialState;

  public componentDidMount() {
    const { toggleLoading } = this.props;
    toggleLoading(false);
  }

  public render(): JSX.Element {
    const { email, undo, loading } = this.props;

    return (
      <div className="Auth">
        <div className="CodeConfirmationForm">
          <h2>Awaiting Confirmation</h2>
          <p>
            We sent an email to {email} (
            <a className="App-link" href="#" onClick={undo}>
              undo
            </a>
            ).
          </p>

          <form onSubmit={this.handleSubmit(email)}>
            <div className="form-field">
              <label>
                Enter the confirmation code
                <br />
                <input
                  name="code"
                  type="text"
                  className="inputCode"
                  disabled={loading}
                  value={this.state.code}
                  onChange={this.handleChange}
                  required={true}
                  min={6}
                  maxLength={6}
                />
              </label>
            </div>

            <div className="form-field">
              <button type="submit" disabled={loading}>
                Confirm
              </button>
            </div>
          </form>

          <p>
            <a className="App-link" href="#" onClick={this.newCode(email)}>
              Send me a new confirmation code
            </a>
          </p>
        </div>
      </div>
    );
  }

  private handleSubmit = (email: string) => async (event: React.FormEvent<HTMLFormElement>) => {
    const { onConfirmed, toggleLoading } = this.props;
    const { code } = this.state;

    const data = {
      username: email.toString().trim(),
      code: code.toString().trim(),
    };

    event.preventDefault();
    toggleLoading(true);

    try {
      await Auth.confirmSignUp(data.username, data.code);
    } catch (err) {
      return;
    } finally {
      toggleLoading(false);
    }

    return onConfirmed();
  };

  private newCode = (email: string) => async (event: React.SyntheticEvent<HTMLAnchorElement>) => {
    const { toggleLoading } = this.props;

    const data: { username: string } = {
      username: email.toString().trim(),
    };

    event.preventDefault();
    toggleLoading(true);

    try {
      await axios(`${API_URL}/new-confirm-code`, {
        method: 'POST',
        data,
      });
    } catch (err) {
      console.log('err', err);
    } finally {
      toggleLoading(false);
    }
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
