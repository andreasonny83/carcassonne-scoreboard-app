import { gql, ApolloError, ValidationError, AuthenticationError } from 'apollo-server';

const game1 = {
  id: 'game-1',
  name: 'game1',
  players: [],
  log: [],
  started: false,
  finished: false,
};

const games = new Map();
games.set(game1.id, game1);

export const typeDefs = gql`
  type Query {
    games: [Game]
    game(id: String!): Game
  }

  type Game {
    id: ID!
    name: String!
    players: [Player]!
    log: Log
    started: Boolean!
    finished: Boolean!
  }

  type Player {
    id: ID!
    name: String!
    color: Color!
    totalScore: Int
  }

  enum Color {
    RED
    BLUE
    GREEN
    YELLOW
    PURPLE
    BLACK
    GREY
  }

  type Log {
    playerId: ID!
    timestamp: Int!
    score: Int!
  }

  type Mutation {
    newGame(id: String): Game!
  }
`;

export const resolvers = {
  Mutation: {
    newGame(parent: any, args: any) {
      console.log('new game');

      const gameId: string = args.id;

      return games.get(gameId);
    },
  },

  Query: {
    game(parent: any, args: any, context: any) {
      console.log('parent', parent);
      console.log('args', args);
      console.log('context', context);

      // if (context.authScope !== 'ADMIN') {
      //   throw new AuthenticationError('not admin');
      // }

      const gameId: string = args.id;
      if (games.has(gameId)) {
        return games.get(gameId);
      }

      // throw new ApolloError(`Game ${args.id} does not exist`);
      throw new ValidationError(`Game ID not found`);
    },
  },
};
