export default `
  enum Color {
    red
    green
    blue
    yellow
    black
    gray
  }

  input PlayerInfoInput {
    name: String!
    key: String!
    color: Color!
  }

  type PlayerInfo {
    name: String!
    key: String!
    color: Color!
    score: Int
  }

  type Log {
    id: ID!
    userId: String!
    score: String!
    timestamp: Int!
  }

  type Game {
    id: ID!
    name: String!
    players: [PlayerInfo]!
    users: [String!]
    started: Boolean!
    finished: Boolean!
    log: [Log]!
  }

  input NewGameInput {
    name: String!
    players: [PlayerInfoInput!]!
  }

  input StartGameInput {
    gameId: String!
  }

  input JoinGameInput {
    gameId: String!
  }

  input UpdateGameInput {
    gameId: String
    playerKey: String
    score: Int
  }

  type Mutation {
    newGame(input: NewGameInput!): Game
    startGame(input: StartGameInput!): Game
    joinGame(input: JoinGameInput!): Game
    updateGame(input: UpdateGameInput!): Game
  }

  type Query {
    games: [Game]
    game(gameId: String!): Game
  }

  type Subscription {
    gameCreated: Game
    gameUpdated: Game
  }
`;
