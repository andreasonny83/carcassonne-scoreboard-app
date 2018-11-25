import React, { PureComponent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './CodeConfirmationForm.css';

const API_URL = 'https://andreasonny83.ngrok.io';

interface CodeConfirmationState {
  code: string;
  busy: boolean;
}

interface CodeConfirmationProps {
  email?: string;
  onConfirmed?: () => void;
}

const initialState: CodeConfirmationState = {
  code: '',
  busy: false,
};

export class CodeConfirmationForm extends PureComponent<
  CodeConfirmationProps,
  CodeConfirmationState
> {
  public readonly state: CodeConfirmationState = initialState;

  public render() {
    const { email } = this.props;

    return (
      <form className="CodeConfirmationForm" onSubmit={this.handleSubmit}>
        <div>
          <h2>Awaiting Confirmation</h2>
          <p>
            We sent an email to {email}(
            <Link to="/" className="App-link">
              undo
            </Link>
            ).
          </p>
          <label>
            Enter confirmation code
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

        <button type="submit" disabled={this.state.busy}>
          Confirm
        </button>
      </form>
    );
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { code } = this.state;

    const data: Partial<CodeConfirmationState> = {
      code: code.toString().trim(),
    };

    this.toggleBusy(true);

    axios(`${API_URL}/confirmation-code`, {
      method: 'POST',
      data,
    })
      .then(() => {
        this.toggleBusy(false);
        // this.props.onConfirmed();
      })
      .catch(() => {
        this.toggleBusy(false);
      });
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
