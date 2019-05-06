import { USER_UPDATE, USER_UPDATED } from '../constants';

export interface UserState {
  readonly username: string;
  readonly nickname: string;
  readonly picture: string;
}

export const initialUserState: Partial<UserState> = {};

export const userReducer = (state = initialUserState, action: any) => {
  switch (action.type) {
    case USER_UPDATE:
      return {
        ...state,
        username: action.payload,
      };
    case USER_UPDATED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
