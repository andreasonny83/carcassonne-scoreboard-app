export default `
  type User {
    id: ID!
    games: [String!]
  }

  type Query {
    users: [User!]
    user: User
  }
`;
