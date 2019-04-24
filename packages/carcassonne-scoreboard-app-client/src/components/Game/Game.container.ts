import gql from 'graphql-tag';
import { graphql, ChildDataProps, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { showNotification } from '../../actions';
import { GameWithStyles } from './GameWithStyles';
import { MeepleColor } from '../Icons';

const GAME_FETCH_QUERY = gql`
  query NewGameQuery($gameId: String!) {
    game(gameId: $gameId) {
      id
      name
      started
      finished
      players {
        name
        key
        color
        score
      }
      users
    }
  }
`;

const START_GAME = gql`
  mutation StartGame($startGameInput: StartGameInput!) {
    startGame(input: $startGameInput) {
      id
      name
      started
      finished
    }
  }
`;

const END_GAME = gql`
  mutation EndGame($endGameInput: EndGameInput!) {
    endGame(input: $endGameInput) {
      id
      name
      started
      finished
    }
  }
`;

const UPDATE_GAME = gql`
  mutation UpdateGame($updateGameInput: UpdateGameInput!) {
    updateGame(input: $updateGameInput) {
      players {
        name
        key
        color
        score
      }
    }
  }
`;

const GAME_UPDATED = gql`
  subscription GameUpdated {
    gameUpdated {
      id
      started
      finished
      players {
        name
        key
        color
        score
      }
    }
  }
`;

export interface Player {
  name: string;
  key: string;
  color: MeepleColor;
  score?: number;
}

interface Game {
  id: string;
  name: string;
  started: boolean;
  finished: boolean;
  players: Player[];
  users: string[];
}

interface Response {
  game: Game;
}

interface Variables {
  gameId?: string;
}

interface InputProps {
  match?: {
    params?: {
      gameId?: string;
    };
  };
}

export type ChildPropsData = ChildDataProps<InputProps, Response, Variables>;

const withGame = compose(
  graphql<InputProps, Response, Variables, ChildPropsData>(GAME_FETCH_QUERY, {
    options: ({ match }) => ({
      variables: {
        gameId: match && match.params && match.params.gameId,
      },
    }),
    props: ({ data }) => {
      console.log('data:', data);

      return { data } as ChildPropsData;
    },
  }),
  graphql(START_GAME, {
    name: 'startGame',
  }),
  graphql(END_GAME, {
    name: 'endGame',
  }),
  graphql(UPDATE_GAME, {
    name: 'updateGame',
  })
);

const mapDispatchToProps = { showNotification };

export const Game = withGame(
  connect(
    null,
    mapDispatchToProps
  )(GameWithStyles)
);

export function subscribeToAuthorMutations(subscribeToMore: any) {
  return subscribeToMore({
    document: GAME_UPDATED,

    updateQuery: (prev: any, { subscriptionData }: any) => {
      console.log('prev', prev);
      console.log('subscriptionData', subscriptionData);
      const data = subscriptionData.data;
      if (!data) {
        return prev;
      }
    },
  });
}
