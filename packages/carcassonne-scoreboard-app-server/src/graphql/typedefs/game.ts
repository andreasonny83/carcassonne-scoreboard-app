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
    color: Color!
  }

  type PlayerInfo {
    id: ID!
    name: String!
    color: Color!
    score: Int!
    userId: String
    picture: String
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
    players: [PlayerInfo!]!
    users: [String!]!
    started: Boolean!
    finished: Boolean!
    log: [String]!
  }

  type GameUpdating {
    loading: Boolean
  }

  input NewGameInput {
    name: String!
    players: [PlayerInfoInput!]!
  }

  input EndGameInput {
    gameId: String!
  }

  input StartGameInput {
    gameId: String!
  }

  input JoinGameInput {
    gameId: String!
  }

  input UpdateGameInput {
    gameId: String
    player: Color
    score: Int
  }

  type Mutation {
    newGame(input: NewGameInput!): Game
    endGame(input: EndGameInput!): Game
    startGame(input: StartGameInput!): Game
    joinGame(input: JoinGameInput!): Game
    updateGame(input: UpdateGameInput!): Game
  }

  type Query {
    games: [Game]
    game(gameId: String!): Game
    gameUpdating(gameId: String!): GameUpdating
  }

  type Subscription {
    gameCreated: Game
    gameUpdated: Game
    gameUpdating: GameUpdating
  }
`;
