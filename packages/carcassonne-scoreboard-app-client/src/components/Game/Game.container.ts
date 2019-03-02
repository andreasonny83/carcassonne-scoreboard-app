import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { GameComponent } from './Game';

const gamesStatQuery = gql`
  query NewGameQuery($gameId: String!) {
    game(gameId: $gameId) {
      id
      name
      started
    }
  }
`;

const withGame = graphql(gamesStatQuery, {
  options: (props: any) => ({
    variables: {
      gameId: props.match && props.match.params && props.match.params.gameId,
    },
  }),
  props: ({ data }: any) => ({
    data,
  }),
});

export const Game = withGame(GameComponent);
