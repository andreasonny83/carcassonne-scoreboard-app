import { gql, ValidationError, ApolloError, AuthenticationError } from 'apollo-server';
import { uniqueNamesGenerator } from 'unique-names-generator';

export const typeDefs = gql`
  type Query {
    games: [Game]
    game(id: String!): Game
    user(id: String!): User
  }

  type Game {
    id: ID!
    name: String!
    players: [Player]
    # log: Log
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

  type User {
    id: ID!
    name: String!
    email: String!
    games: Int!
  }

  type Mutation {
    newGame: Game
    game(id: String!): Game
  }
`;

class Game {
  public name: string;
  public id: string;
  public started: boolean;
  public finished: boolean;
  public players: any[];
  public log: any[];

  constructor(name: string) {
    this.id = name;
    this.name = name;
    this.started = false;
    this.finished = false;
    this.players = [];
    this.log = [];
  }
}

const games = new Map();

export const resolvers = {
  Mutation: {
    newGame() {
      const gameId: string = uniqueNamesGenerator('_');
      games.set(gameId, new Game(gameId));
      return games.get(gameId);
    },

    game(parent: any, args: any) {
      const gameId: string = args.id;
      if (games.has(gameId)) {
        return games.get(gameId);
      }

      // throw new ApolloError(`Game ${args.id} does not exist`);
      throw new ValidationError(`Game ID not found`);
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

    games() {
      return games;
    },

    user(parent: any, args: any, context: any) {
      const userId: string = args.id;

      return {
        id: '123',
        name: 'test',
        email: 'test@test.com',
        games: 1,
      };
    },
  },
};
