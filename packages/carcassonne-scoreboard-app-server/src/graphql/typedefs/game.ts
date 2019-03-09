export default `
  type Game {
    id: ID!
    name: String!
    players: [String!]
    # log: Log
    started: Boolean!
    finished: Boolean!
  }

  type Mutation {
    newGame: Game
    startGame(gameId: String!): Game
    joinGame(gameId: String!): Game
  }

  type Query {
    games: [Game]
    game(gameId: String!): Game
  }
`;
