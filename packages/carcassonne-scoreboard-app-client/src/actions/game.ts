import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

export const newGame = (gameId: string) => async (disapatch: Dispatch) => {
  disapatch(push(`/app/game/${gameId}/new`));
};

export const joinGame = (gameId: string) => async (disapatch: Dispatch) => {
  disapatch(push(`/app/game/${gameId}`));
};
