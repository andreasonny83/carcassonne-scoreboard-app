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
    color: Color!
    score: String!
    points: String!
  }

  type Game {
    id: ID!
    name: String!
    date: String!
    players: [PlayerInfo!]!
    users: [String!]!
    started: Boolean!
    finished: Boolean!
    log: [Log]!
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

  input RedeemPlayerInput {
    gameId: String
    player: Color
  }

  input UndoLastMoveInput {
    gameId: String
  }

  type Mutation {
    newGame(input: NewGameInput!): Game
    endGame(input: EndGameInput!): Game
    startGame(input: StartGameInput!): Game
    joinGame(input: JoinGameInput!): Game
    updateGame(input: UpdateGameInput!): Game
    redeemPlayer(input: RedeemPlayerInput!): Game
    undoLastMove(input: UndoLastMoveInput!): Game
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
