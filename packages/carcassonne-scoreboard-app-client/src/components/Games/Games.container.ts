import gql from 'graphql-tag';
import { graphql, compose, ChildDataProps } from 'react-apollo';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { showNotification, updateUserData } from '../../actions';
import { GamesWithStyles } from './GamesWithStyles';
import { UserState } from '../../reducers/user';

export interface UserGame {
  gameId: string;
  finished: boolean;
  date: string;
}

interface UserData {
  games: UserGame[];
}

const QUERY_GAMES = gql`
  query GamesQuery($userId: String!) {
    user(userId: $userId) {
      games {
        gameId
        finished
        date
      }
    }
  }
`;

const withUser = compose(
  graphql(QUERY_GAMES, {
    options: (props: any) => {
      const user: UserState = props.user;

      return {
        variables: {
          userId: user && user.username,
        },
        fetchPolicy: 'no-cache',
      };
    },
  })
);

interface Response {
  user: UserData;
}

export type ChildPropsData = ChildDataProps<{}, Response>;

const mapStateToProps = (store: any) => ({
  user: store.user,
});

const mapDispactToProps = {
  go: push,
  updateUserData,
  showNotification,
};

export const Games = connect(
  mapStateToProps,
  mapDispactToProps
)(withUser(GamesWithStyles));
