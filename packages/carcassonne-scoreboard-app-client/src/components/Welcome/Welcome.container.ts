import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { newGame, joinGame } from '../../actions';
import { WelcomeWithStyles } from './WelcomeWithStyles';

export interface WelcomeUserData {
  id: string;
  games: string[];
  victories: number;
  defeats: number;
}

const playerQuery = gql`
  query PlayerQuery($userId: String!) {
    user(userId: $userId) {
      id
      games
      victories
      defeats
    }
  }
`;


const withGame = compose(
  graphql(playerQuery, {
    options: (props: any) => ({
      variables: {
        userId: props.user.username,
      },
    }),
  }),
);

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = {
  newGame,
  joinGame,
};

export const Welcome = connect(
  mapStateToProps,
  mapDispatchToProps
)(withGame(WelcomeWithStyles));
