import { NOTIFICATION_CLOSE, NOTIFICATION_SHOW } from '../constants/notifications';

export interface NotificationState {
  message?: string;
  open: boolean;
}

export const initialState: NotificationState = {
  open: false,
};

export const notificationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NOTIFICATION_CLOSE:
      return {
        ...state,
        open: false,
      };
    case NOTIFICATION_SHOW:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        timeout: action.payload.timeout,
      };
    default:
      return state;
  }
};
