import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql, ChildDataProps } from 'react-apollo';
import { push } from 'connected-react-router';

import { showNotification, joinGame  } from '../../actions';
import { NewGameWithStyles } from './NewGameWithStyles';
import { Player } from '../Game';

export type NewGamePlayer = Player & {
  key: string;
};

const newGameMutation = gql`
  mutation NewGame($newGameInput: NewGameInput!) {
    newGame(input: $newGameInput) {
      id
      name
      started
    }
  }
`;

const withNewGame = graphql(newGameMutation, { name: 'newGame' });

export type ChildPropsData = ChildDataProps<any>;

const mapDispatchToProps = {
  showNotification,
  joinGame,
  go: push,
};

export const NewGame = withNewGame(
  connect(
    null,
    mapDispatchToProps
  )(NewGameWithStyles)
);
