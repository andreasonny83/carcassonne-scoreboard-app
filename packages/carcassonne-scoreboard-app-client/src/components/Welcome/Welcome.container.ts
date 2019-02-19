import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { newGame, joinGame } from '../../actions';
import { WelcomeComponent, WelcomeProps } from './Welcome';

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

interface NewGameProps {
  newGame(): any;
}

export interface NewGameResponse {
  newGame: {
    id: string;
  };
}

const withGame = compose(
  graphql<WelcomeProps, NewGameResponse, null, NewGameProps>(newGameMutation, {
    name: 'newGameMutation',
  }),
  graphql<WelcomeProps, NewGameResponse, any, any>(joinGameMutation, {
    name: 'joinGameMutation',
  })
);

export const Welcome = withGame(
  connect(
    null,
    { newGame, joinGame }
  )(WelcomeComponent)
);
