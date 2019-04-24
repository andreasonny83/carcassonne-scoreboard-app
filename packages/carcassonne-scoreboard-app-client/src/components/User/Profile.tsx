import React, { PureComponent } from 'react';
import { Avatar } from 'react-avataaars';
import uuid from 'uuid';
import {
  Paper,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';

import { AppContext, IAppContext } from '../PrivateRouter/app.context';
import { ProfileStylesProps } from './ProfileWithStyles';
import { Twemoji } from '../twemoji';

interface ProfileProps extends ProfileStylesProps {
  avatarHash?: string;
  updateUserData(data: any): any;
  push(path: string): void;
}

interface ProfileState {
  loading: boolean;
  userName: string;
  avatarHash: string;
}

const initialState: ProfileState = {
  loading: false,
  userName: '',
  avatarHash: '',
};

export class Profile extends PureComponent<ProfileProps, ProfileState> {
  public static contextType: React.Context<IAppContext> = AppContext;
  public context!: React.ContextType<typeof AppContext>;
  public readonly state: ProfileState = initialState;

  public componentDidMount() {
    const { user } = this.context;

    this.setState({
      userName: user.nickname || '',
      avatarHash: user.picture || '',
    });
  }

  public render(): JSX.Element | null {
    const { loading, userName, avatarHash } = this.state;
    const { classes } = this.props;

    return (
      <Paper elevation={1} className={classes.root}>
        <Typography component="h2" variant="h5" color="inherit" align="center" gutterBottom>
          User Profile
        </Typography>

        <Grid container direction={'row'}>
          <Grid item xs={12} lg={4}>
            <Grid container direction={'column'} alignItems={'center'}>
              <Grid item>
                <Avatar size="200px" hash={avatarHash} className={classes.avatar} />
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" onClick={this.randomAvatar}>
                  <Twemoji copy="🔀 Random Avatar" size={24} />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <FormControl margin="normal" variant="outlined" required fullWidth>
              <InputLabel htmlFor="userNameInput" variant="outlined">
                Player Name
              </InputLabel>
              <OutlinedInput
                id="userNameInput"
                name="userNameInput"
                type="string"
                value={userName}
                disabled={loading}
                onChange={this.changeUsername}
                labelWidth={120}
                required={true}
                autoFocus
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container justify={'flex-end'}>
          <Button onClick={this.cancel} variant="outlined" color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={this.save}
            type="submit"
            variant="outlined"
            color="primary"
            disabled={loading}
          >
            Save
          </Button>
        </Grid>
      </Paper>
    );
  }

  private changeUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const value: string = target && target.value;

    event.preventDefault();

    this.setState({
      userName: value,
    });
  };

  private save = async () => {
    const { updateUserData, push } = this.props;
    const { userName, avatarHash } = this.state;

    await updateUserData({
      nickname: userName,
      picture: avatarHash,
    });

    push('/');
  };

  private cancel = () => {
    const { push } = this.props;

    push('/app');
  };

  private randomAvatar = () => {
    const random = uuid.v4();

    this.setState({
      avatarHash: random,
    });
  };
}
