import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import { showNotification } from '../../actions';
import { NewGameWithStyles } from './NewGameWithStyles';

const newGameMutation = gql`
  mutation NewGame($gameName: String!, $players: [PlayerInfoInput!]!) {
    newGame(gameName: $gameName, players: $players) {
      id
      name
      started
    }
  }
`;


const withNewGame = graphql(newGameMutation, {
  name: 'newGame',
  options: (props: any) => ({}),
});

const mapDispatchToProps = {
  showNotification,
};

export const NewGame = withNewGame(
  connect(
    null,
    mapDispatchToProps
  )(NewGameWithStyles)
);
