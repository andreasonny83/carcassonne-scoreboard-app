import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

export const newGame = (gameId: string) => async (disapatch: Dispatch) => {
  disapatch(push(`/game/${gameId}/new`));
};

export const joinGame = (gameId: string) => async (disapatch: Dispatch) => {
  disapatch(push(`/game/${gameId}`));
};
