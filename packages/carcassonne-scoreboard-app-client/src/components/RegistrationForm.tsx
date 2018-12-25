import React, { Component } from 'react';
import Auth from '@aws-amplify/auth';

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

export class RegistrationForm extends Component<RegistrationFormProps, RegistrationFormState> {
  public readonly state: RegistrationFormState = initialState;

  public render(): JSX.Element {
    return (
      <div className="RegistrationForm">
        <h2>Register</h2>

        <form onSubmit={this.handleSubmit}>
          <div className="form-field">
            <label>
              Email
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

          <div className="form-field">
            <label>
              Password
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

          <div className="form-field">
            <button type="submit" disabled={this.state.busy}>
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }

  public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = this.state;

    const data = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

    let authStatus;
    this.toggleBusy(true);

    try {
      authStatus = await Auth.signUp({
        ...data,
        attributes: {
          nickname: data.username,
        },
      });
    } catch (err) {
      this.handleError(err);
      return;
    } finally {
      this.toggleBusy(false);
    }

    console.log(authStatus);

    this.props.onRegistration(username);

    // axios(`${API_URL}/register`, {
    //   method: 'POST',
    //   data,
    // })
    //   .then(() => {
    //     this.toggleBusy(false);
    //     this.props.onRegistration(username);
    //   })
    //   .catch(() => {
    //     this.toggleBusy(false);
    //   });
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

  private handleError(err: AmplifyErrorResponse) {
    console.error(err.message);
  }

  private toggleBusy(state: boolean): void {
    this.setState(
      (prevState: RegistrationFormState): RegistrationFormState => ({
        ...prevState,
        busy: state,
      })
    );
  }
}
