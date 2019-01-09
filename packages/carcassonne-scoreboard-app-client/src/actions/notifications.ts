import { Dispatch } from 'redux';
import { NOTIFICATION_CLOSE, NOTIFICATION_SHOW } from '../constants/notifications';

export const closeNotification = () => async (dispatch: Dispatch) => {
  dispatch({
    type: NOTIFICATION_CLOSE,
  });
};
export const showNotification = (message: string, timeout?: number) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: NOTIFICATION_SHOW,
    payload: {
      message,
      timeout,
    },
  });
};
