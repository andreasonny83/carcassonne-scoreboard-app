import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { newGame, joinGame, showNotification } from '../../actions';
import { WelcomeComponent, WelcomeProps } from './Welcome';

export interface UserData {
  id: string;
  games: string[];
}

const newGameMutation = gql`
  mutation NewGameMutation {
    newGame {
      id
    }
  }
`;

const joinGameMutation = gql`
  mutation JoinGameQuery($gameId: String!) {
    joinGame(gameId: $gameId) {
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

interface NewGameProps {
  newGame(): any;
}

export interface NewGameResponse {
  newGame: {
    id: string;
  };
}

const withGame = compose(
  graphql(playerQuery),
  graphql<WelcomeProps, NewGameResponse, null, NewGameProps>(newGameMutation, {
    name: 'newGameMutation',
    options: {
      refetchQueries: [{ query: playerQuery }],
    },
  }),
  graphql<WelcomeProps, NewGameResponse, any, any>(joinGameMutation, {
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
  )(WelcomeComponent)
);
