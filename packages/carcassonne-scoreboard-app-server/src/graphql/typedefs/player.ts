export default `
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
`;
