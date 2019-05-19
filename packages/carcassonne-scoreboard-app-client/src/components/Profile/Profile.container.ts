import gql from 'graphql-tag';
import { graphql, compose, ChildDataProps } from 'react-apollo';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';

import { showNotification, updateUserData } from '../../actions';
import { ProfileWithStyles } from './ProfileWithStyles';
import { UserState } from '../../reducers/user';

interface UserData {
  id: string;
  picture: string;
  nickname: string;
}

const QUERY_USER = gql`
  query UserQuery($userId: String!) {
    user(userId: $userId) {
      id
      picture
      nickname
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(input: $updateUserInput) {
      picture
      nickname
    }
  }
`;

const withUser = compose(
  graphql(QUERY_USER, {
    options: (props: any) => {
      const user: UserState = props.user;

      return {
        fetchPolicy: 'no-cache',
        variables: {
          userId: user && user.username,
        },
      };
    },
  }),
  graphql(UPDATE_USER, { name: 'updateUser' })
);

interface Response {
  user: UserData;
}

export type ChildPropsData = ChildDataProps<{}, Response>;

const mapStateToProps = (store: any) => ({
  user: store.user,
});

const mapDispactToProps = {
  goBack,
  updateUserData,
  showNotification,
};

export const UserProfile = connect(
  mapStateToProps,
  mapDispactToProps
)(withUser(ProfileWithStyles));
