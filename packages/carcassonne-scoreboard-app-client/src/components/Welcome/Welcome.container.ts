import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { newGame, joinGame, showNotification } from '../../actions';
import { WelcomeProps } from './Welcome';
import { WelcomeWithStyles } from './WelcomeWithStyles';

export interface UserData {
  id: string;
  games: string[];
}

const joinGameMutation = gql`
  mutation JoinGame($joinGameInput: JoinGameInput!) {
    joinGame(input: $joinGameInput) {
      id
    }
  }
`;

const playerQuery = gql`
  query PlayerQuery {
    user {
      id
      games
    }
  }
`;

export interface JoinGameResponse {
  game: {
    id: string;
  };
}

const withGame = compose(
  graphql(playerQuery),
  graphql<WelcomeProps, JoinGameResponse, any, any>(joinGameMutation, {
    name: 'joinGameMutation',
    options: {
      refetchQueries: [{ query: playerQuery }],
    },
  })
);

const mapDispatchToProps = {
  newGame,
  joinGame,
  showNotification,
};

export const Welcome = withGame(
  connect(
    null,
    mapDispatchToProps
  )(WelcomeWithStyles)
);
