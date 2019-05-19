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
      date
      started
      finished
      users
      players {
        name
        color
        score
        userId
        picture
      }
      log {
        id
        score
        points
        color
        userId
      }
    }
  }
`;

const JOIN_GAME = gql`
  mutation JoinGame($joinGameInput: JoinGameInput!) {
    joinGame(input: $joinGameInput) {
      users
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

const START_GAME = gql`
  mutation StartGame($startGameInput: StartGameInput!) {
    startGame(input: $startGameInput) {
      id
      name
      started
      finished
      users
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
      users
      players {
        name
        color
        score
        userId
        picture
      }
      log {
        id
        score
        points
        userId
        color
      }
    }
  }
`;

const REDEEM_PLAYER = gql`
  mutation RedeemPlayer($redeemPlayerInput: RedeemPlayerInput!) {
    redeemPlayer(input: $redeemPlayerInput) {
      users
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

const UNDO_MOVE = gql`
  mutation UndoMove($undoLastMoveInput: UndoLastMoveInput!) {
    undoLastMove(input: $undoLastMoveInput) {
      log {
        id
        score
        points
        userId
        color
      }
    }
  }
`;

const GAME_UPDATED = gql`
  subscription GameUpdated($gameId: String!) {
    gameUpdated(gameId: $gameId) {
      users
      started
      finished
      players {
        name
        color
        score
        userId
        picture
      }
      log {
        id
        score
        points
        userId
        color
      }
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

export interface Log {
  id: string;
  userId: string;
  score: string;
  points: string;
  color: MeepleColor;
}

export interface Game {
  id: string;
  date: string;
  name: string;
  started: boolean;
  finished: boolean;
  players: Player[];
  users: string[];
  log: Log[];
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
  graphql<InputProps, Response, Variables, ChildPropsData>(GAME_QUERY, {
    options: ({ match }) => ({
      variables: {
        gameId: match && match.params && match.params.gameId,
      },
      fetchPolicy: 'cache-and-network',
    }),
    props: ({ data }) => {
      return { data } as ChildPropsData;
    },
  }),
  graphql(START_GAME, { name: 'startGame' }),
  graphql(JOIN_GAME, { name: 'joinGame' }),
  graphql(END_GAME, { name: 'endGame' }),
  graphql(UPDATE_GAME, { name: 'updateGame' }),
  graphql(REDEEM_PLAYER, { name: 'redeemPlayer' }),
  graphql(UNDO_MOVE, { name: 'undoMove' }),
  graphql(GAME_UPDATED, { name: 'gameUpdated' }),
);

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = { showNotification };

export const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(withGame(GameWithStyles));

export function onGameUpdated(subscribeToMore: any, gameId: string) {
  return subscribeToMore({
    document: GAME_UPDATED,

    variables: { gameId },

    updateQuery: (prev: any, { subscriptionData }: any) => {
      const { data } = subscriptionData;

      if (!data) {
        return prev;
      }

      return {
        ...prev,
        game: {
          ...prev.game,
          players: data.gameUpdated.players,
          users: data.gameUpdated.users,
          started: data.gameUpdated.started,
          finished: data.gameUpdated.finished,
          log: data.gameUpdated.log,
        },
      };
    },
  });
}
