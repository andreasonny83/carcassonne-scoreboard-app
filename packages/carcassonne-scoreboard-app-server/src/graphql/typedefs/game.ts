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


  type Game {
    id: ID!
    name: String!
    players: [PlayerInfo]!
    users: [String!]
    started: Boolean!
    finished: Boolean!
    # log: Log
  }

  type Mutation {
    newGame(gameName: String! players: [PlayerInfoInput!]!): Game
    startGame(gameId: String!): Game
    joinGame(gameId: String!): Game
    updateGame(gameId: String, playerKey: String, score: Int): Game
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
