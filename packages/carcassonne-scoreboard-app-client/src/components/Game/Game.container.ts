import gql from 'graphql-tag';
import { graphql, ChildDataProps, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { showNotification } from '../../actions';
import { GameWithStyles } from './GameWithStyles';
import { MeepleColor } from '../Icons';

const GAME_QUERY = gql`
  query GameQuery($gameId: String!) {
    game(gameId: $gameId) {
      id
      name
      started
      finished
      players {
        name
        color
        score
        userId
        picture
      }
      users
    }

    gameUpdating(gameId: $gameId) {
      loading
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
        color
        score
        userId
        picture
      }
    }
  }
`;

const GAME_UPDATED = gql`
  subscription GameUpdated {
    gameUpdated {
      players {
        name
        color
        score
        userId
        picture
      }
    }
  }
`;

const GAME_UPDATING = gql`
  subscription GameUpdating {
    gameUpdating {
      loading
    }
  }
`;

export interface Player {
  name: string;
  color: MeepleColor;
  score?: number;
  userId?: string;
  picture?: string;
}

export interface Game {
  id: string;
  name: string;
  started: boolean;
  finished: boolean;
  players: Player[];
  users: string[];
}

interface Response {
  game: Game;
  gameUpdating: {
    loading: boolean;
  };
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
  graphql<InputProps, Response, Variables, ChildPropsData>(GAME_QUERY, {
    options: ({ match }) => ({
      variables: {
        gameId: match && match.params && match.params.gameId,
      },
    }),
    props: ({ data }) => {
      return { data } as ChildPropsData;
    },
  }),
  graphql(START_GAME, { name: 'startGame' }),
  graphql(END_GAME, { name: 'endGame' }),
  graphql(UPDATE_GAME, { name: 'updateGame' }),
  graphql(GAME_UPDATED, { name: 'gameUpdated' }),
  graphql(GAME_UPDATING, { name: 'gameUpdating' })
);

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = { showNotification };

export const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(withGame(GameWithStyles));

export function onGameUpdated(subscribeToMore: any) {
  return subscribeToMore({
    document: GAME_UPDATED,

    updateQuery: (prev: any, { subscriptionData }: any) => {
      const { data } = subscriptionData;

      if (!data) {
        return prev;
      }

      return {
        ...prev,
        game: {
          ...prev.game,
          ...data.gameUpdated,
        },
      };
    },
  });
}

export function onGameUpdating(subscribeToMore: any) {
  return subscribeToMore({
    document: GAME_UPDATING,

    updateQuery: (prev: any, { subscriptionData }: any) => {
      const { data } = subscriptionData;

      if (!data) {
        return prev;
      }

      return {
        ...prev,
        gameUpdating: {
          ...prev.gameUpdating,
          loading: Boolean(data.gameUpdating.loading),
        },
      };
    },
  });
}
