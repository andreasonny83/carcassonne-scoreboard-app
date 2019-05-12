export default `
  type UserGame {
    gameId: ID!
    finished: Boolean!
    date: String!
  }

  type User {
    id: ID!
    nickname: String!
    games: [UserGame]!
    victories: Int!
    defeats: Int!
    picture: String!
  }

  input UpdateUserInput {
    userId: String!
    nickname: String!
    picture: String!
  }

  type Query {
    user(userId: String!): User
  }

  type Mutation {
    updateUser(input: UpdateUserInput!): User
  }
`;
