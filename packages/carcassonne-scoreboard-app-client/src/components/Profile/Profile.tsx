import React, { PureComponent } from 'react';
import { Avatar } from 'react-avataaars';
import get from 'lodash/get';
import uuid from 'uuid';
import {
  Paper,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { ProfileStylesProps } from './ProfileWithStyles';
import { Twemoji } from '../twemoji';
import { ChildPropsData } from './Profile.container';
import { formatErrorAndLog } from '../../utils/formatErrors';

type ProfileProps = ProfileStylesProps &
  ChildPropsData & {
    width: Breakpoint;
    avatarHash?: string;
    updateUser(data: any): any;
    updateUserData(data: any): any;
    goBack(): void;
    showNotification(message: string): void;
  };

interface ProfileState {
  readonly userName: string;
  readonly avatarHash: string;
  readonly busy: boolean;
}

const initialState: ProfileState = {
  userName: '',
  avatarHash: '',
  busy: true,
};

export class Profile extends PureComponent<ProfileProps, ProfileState> {
  public readonly state: ProfileState = initialState;

  public componentDidUpdate() {
    const { data } = this.props;
    const { userName, avatarHash } = this.state;

    if (data.user && !userName && !avatarHash) {
      this.setState({
        userName: data.user.nickname || '',
        avatarHash: data.user.picture || '',
        busy: false,
      });
    }
  }

  public render(): JSX.Element {
    const { classes, width, data } = this.props;
    const { userName, avatarHash, busy } = this.state;
    const { loading, error } = data;
    const isMobile = !isWidthUp('sm', width);

    if (loading) {
      return (
        <Paper
          elevation={isMobile ? 0 : 1}
          square={isMobile}
          className="paper"
          style={{ padding: '4em' }}
        >
          <Grid direction="column" alignItems="center" container>
            <CircularProgress style={{ marginBottom: '2em' }} />
            <Typography>Preparing profile screen...</Typography>
          </Grid>
        </Paper>
      );
    }

    if (error || !data.user) {
      const graphQLError = get(
        data,
        'error.graphQLErrors[0].message',
        'Ops! Something went wrong.'
      );

      return (
        <Paper elevation={isMobile ? 0 : 1} square={isMobile} className={classes.root}>
          <Grid direction="column" container>
            <Typography component="h2" variant="h4" align="center" gutterBottom>
              Error
            </Typography>
            <Typography component="p" align="center">
              {graphQLError}
            </Typography>
          </Grid>
        </Paper>
      );
    }

    return (
      <Paper elevation={isMobile ? 0 : 1} square={isMobile} className={classes.root}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          className={classes.title}
        >
          User Profile
        </Typography>

        <Grid container direction="row">
          <Grid item xs={12} lg={4} className={classes.block}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Avatar size="200px" hash={avatarHash} className={classes.avatar} />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={busy}
                  onClick={this.randomAvatar}
                >
                  <Twemoji copy="🔀 Random Avatar" size={24} />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} lg={8} justify="center" className={classes.block}>
            <FormControl
              className={classes.formControl}
              margin="normal"
              variant="outlined"
              required
              fullWidth
            >
              <InputLabel htmlFor="userNameInput" variant="outlined">
                Player Name
              </InputLabel>
              <OutlinedInput
                id="userNameInput"
                name="userNameInput"
                type="string"
                value={userName}
                disabled={busy}
                onChange={this.changeUsername}
                labelWidth={120}
                required={true}
                autoFocus
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container justify="flex-end" className={classes.action}>
          <Button
            className={classes.button}
            onClick={this.cancel}
            variant="outlined"
            color="secondary"
            disabled={busy}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            onClick={this.save(data.user.id)}
            type="submit"
            variant="outlined"
            color="primary"
            disabled={busy}
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

  private save = (userId: string) => async () => {
    const { updateUser, updateUserData, goBack, showNotification } = this.props;
    const { userName, avatarHash } = this.state;

    this.setState({ busy: true });

    try {
      await updateUser({
        variables: {
          updateUserInput: {
            userId,
            nickname: userName,
            picture: avatarHash,
          },
        },
      });
    } catch (err) {
      showNotification(`⛔️ ${formatErrorAndLog(err).message}`);
      this.setState({ busy: false });
      return;
    }

    await updateUserData({
      nickname: userName,
      picture: avatarHash,
    });

    showNotification(`🎉 User information updated`);

    goBack();
  };

  private cancel = () => {
    const { goBack } = this.props;

    goBack();
  };

  private randomAvatar = () => {
    const random = uuid.v4();

    this.setState({
      avatarHash: random,
    });
  };
}
