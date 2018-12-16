import React, { Component } from 'react';
import Auth from '@aws-amplify/auth';
import axios from 'axios';

import { API_URL } from '../config';

interface CodeConfirmationState {
  code: string;
  busy: boolean;
}

interface CodeConfirmationProps {
  email?: string;
  undo: () => void;
  onConfirmed: () => void;
}

const initialState: CodeConfirmationState = {
  code: '',
  busy: false,
};

export class CodeConfirmationForm extends Component<CodeConfirmationProps, CodeConfirmationState> {
  public readonly state: CodeConfirmationState = initialState;

  public render() {
    const { email, undo } = this.props;

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
                  disabled={this.state.busy}
                  value={this.state.code}
                  onChange={this.handleChange}
                  required={true}
                  min={6}
                  maxLength={6}
                />
              </label>
            </div>

            <div className="form-field">
              <button type="submit" disabled={this.state.busy}>
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

  private handleSubmit = (email: string = '') => async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const { code } = this.state;

    const data = {
      username: email.toString().trim(),
      code: code.toString().trim(),
    };

    this.toggleBusy(true);

    try {
      await Auth.confirmSignUp(data.username, data.code);
    } catch (err) {
      console.log(err);
    } finally {
      this.toggleBusy(false);
    }

    return this.props.onConfirmed();
  };

  private newCode = (email: string = '') => (event: React.SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const data: { username: string } = {
      username: email.toString().trim(),
    };

    this.toggleBusy(true);

    axios(`${API_URL}/new-confirm-code`, {
      method: 'POST',
      data,
    })
      .then(res => {
        this.toggleBusy(false);
        console.log('result', res);
      })
      .catch(err => {
        this.toggleBusy(false);
        console.log('err', err);
      });
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const name: string = target && target.name;
    const value: string = target && target.value;

    this.setState(
      (prevState: CodeConfirmationState): CodeConfirmationState => ({
        ...prevState,
        [name]: value,
      })
    );

    event.preventDefault();
  };

  private toggleBusy(state: boolean): void {
    this.setState(
      (prevState: CodeConfirmationState): CodeConfirmationState => ({
        ...prevState,
        busy: state,
      })
    );
  }
}
