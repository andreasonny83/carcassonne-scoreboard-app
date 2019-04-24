import { USER_UPDATE, USER_UPDATED } from '../constants';

export interface UserState {
  username?: string;
  email?: string;
  nickname?: string;
  picture?: string;
}

export const initialUserState: UserState = {};

export const userReducer = (state = initialUserState, action: any) => {
  switch (action.type) {
    case USER_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case USER_UPDATED:
      return action.payload;
    default:
      return state;
  }
};
