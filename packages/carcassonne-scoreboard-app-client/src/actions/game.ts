import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

export const newGame = (gameId: string) => async (dispatch: Dispatch) => {
  dispatch(push(`/app/game/${gameId}/new`));
};

export const joinGame = (gameId: string) => async (dispatch: Dispatch) => {
  dispatch(push(`/app/game/${gameId}`));
};
