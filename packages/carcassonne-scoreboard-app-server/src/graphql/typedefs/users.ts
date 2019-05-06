export default `
  type User {
    id: ID!
    nickname: String!
    games: [String]!
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
