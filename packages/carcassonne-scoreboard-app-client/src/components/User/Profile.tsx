import React, { PureComponent } from 'react';
import Auth from '@aws-amplify/auth';

import { UserContext, IUser } from '../PrivateRouter/user.context';
import { Link } from 'react-router-dom';

interface UserProfileProps {
  data?: any; // Temp
  updateUserData(data: any): any;
}

interface UserProfileState {
  username: string;
  loading: boolean;
}

const initialState: UserProfileState = {
  username: '',
  loading: false,
};

export class UserProfileComponent extends PureComponent<UserProfileProps, UserProfileState> {
  public static contextType: React.Context<IUser> = UserContext;
  public context!: React.ContextType<typeof UserContext>;
  public readonly state: UserProfileState = initialState;

  public componentDidMount() {
    const { nickname } = this.context;

    this.setState({
      username: nickname,
    });
  }

  public render(): JSX.Element | null {
    const { nickname } = this.context as IUser;
    const { loading, username } = this.state;

    return (
      <div className="UserProfile container">
        <h2>User Profile</h2>
        <p>{nickname}</p>
        <div className="row">Update username</div>
        <div className="row">
          <label>
            New username
            <input
              name="username"
              type="text"
              className="usernameId"
              disabled={loading}
              value={username}
              onChange={this.changeUsername}
              required={true}
            />
          </label>
        </div>
        <div className="row">
          <button className="username" onClick={this.updateUsername(username)}>
            Update
          </button>
        </div>

        <Link to="/app">Back to Homepage</Link>
      </div>
    );
  }

  private changeUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const value: string = target && target.value;

    event.preventDefault();

    this.setState({
      username: value,
    });
  };

  private updateUsername = (username: string) => async () => {
    const { updateUserData } = this.props;

    updateUserData({ nickname: username });
  };
}
