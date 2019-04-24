import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

export const newGame = () => async (dispatch: Dispatch) => {
  dispatch(push(`/app/game/new`));
};

export const joinGame = (gameId: string) => async (dispatch: Dispatch) => {
  dispatch(push(`/app/game/${gameId}`));
};
