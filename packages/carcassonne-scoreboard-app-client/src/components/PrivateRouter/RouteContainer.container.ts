import gql from 'graphql-tag';
import { graphql, compose, ChildDataProps } from 'react-apollo';
import { connect } from 'react-redux';

import { updateUserData, showNotification } from '../../actions';
import { RouteContainer } from './RouteContainer';
import { UserState } from '../../reducers/user';

interface UserData {
  id: string;
  picture: string;
  nickname: string;
}

interface Response {
  user: UserData;
}

const QUERY_USER = gql`
  query UserQuery($userId: String!) {
    user(userId: $userId) {
      picture
      nickname
    }
  }
`;

export type RouteContainerPropsData = ChildDataProps<{}, Response>;

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
  })
);

const mapDispactToProps = {
  updateUserData,
  showNotification,
};

export const PrivateRouterContainer = connect(
  null,
  mapDispactToProps
)(withUser(RouteContainer)) as any;
