import React, { PureComponent } from 'react';
import axios from 'axios';
const API_URL = 'https://andreasonny83.ngrok.io';

interface RegistrationFormState {
  username: string;
  password: string;
  busy: boolean;
}

interface RegistrationFormProps {
  onRegistration: (email: string) => void;
}

const initialState: RegistrationFormState = {
  username: '',
  password: '',
  busy: false,
};

export class RegistrationForm extends PureComponent<
  RegistrationFormProps,
  RegistrationFormState
> {
  public readonly state: RegistrationFormState = initialState;

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Enter username
            <input
              name="username"
              type="email"
              disabled={this.state.busy}
              value={this.state.username}
              onChange={this.handleChange}
              required={true}
              minLength={6}
            />
          </label>
        </div>

        <div>
          <label>
            Enter password
            <input
              name="password"
              type="password"
              disabled={this.state.busy}
              value={this.state.password}
              onChange={this.handleChange}
              required={true}
              minLength={6}
            />
          </label>
        </div>

        <button type="submit" disabled={this.state.busy}>
          Register
        </button>
      </form>
    );
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = this.state;

    const data: Partial<RegistrationFormState> = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

    this.toggleBusy(true);

    axios(`${API_URL}/register`, {
      method: 'POST',
      data,
    })
      .then(() => {
        this.toggleBusy(false);
        this.props.onRegistration(username);
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
      (prevState: RegistrationFormState): RegistrationFormState => ({
        ...prevState,
        [name]: value,
      })
    );

    event.preventDefault();
  };

  private toggleBusy(state: boolean): void {
    this.setState(
      (prevState: RegistrationFormState): RegistrationFormState => ({
        ...prevState,
        busy: state,
      })
    );
  }
}
