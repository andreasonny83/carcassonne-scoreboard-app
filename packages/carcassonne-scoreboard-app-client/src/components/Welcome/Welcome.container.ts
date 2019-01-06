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
    game(id: $gameId) {
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
    // options: (props: any) => {
    //   console.log('props', props);

    //   return {
    //     variables: {
    //       gameId: 'determined_purple_bobcat',
    //     },
    //   };
    // },
  })
);

export const Welcome = withGame(
  connect(
    null,
    { newGame, joinGame }
  )(WelcomeComponent)
);
