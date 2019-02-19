import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { HomeComponent } from './Home';

export interface UserData {
  id: string,
  name: string;
  email: string;
  games: any;
}

const gamesStatQuery = gql`
  query userQuery($userId: String!) {
    user(id: $userId) {
      id
      name
      email
      games
    }
  }
`;

const withGame = graphql(gamesStatQuery, {
  options: (props: any) => ({
    variables: {
      userId: props.userId,
    },
  }),
  props: ({ data }: any) => ({
    data,
  }),
});

export const Home = withGame(HomeComponent);
