import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import { showNotification, joinGame } from '../../actions';
import { NewGameWithStyles } from './NewGameWithStyles';
import { MeepleColor } from '../Icons';

export interface IPlayer {
  key: string;
  name: string;
  color: MeepleColor;
  active: boolean;
}

const newGameMutation = gql`
  mutation NewGame($newGameInput: NewGameInput!) {
    newGame(input: $newGameInput) {
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
  joinGame,
};

export const NewGame = withNewGame(
  connect(
    null,
    mapDispatchToProps
  )(NewGameWithStyles)
);
