import {
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
  VERIFY_USER,
  SIGN_IN_FAILURE,
  SIGN_IN_CODE_CONFIRMATION,
  SIGNED_UP,
  SIGN_UP_FAILURE,
  UNDO_VERIFICATION_CODE,
  CODE_CONFIRMED,
  CODE_CONFIRM_FAILURE,
  SEND_NEW_CONFIRM_FAILURE,
  SEND_NEW_CONFIRM_SUCCESS,
} from '../constants';

export interface AuthState {
  email?: string | null;
  loading?: boolean;
  showCodeConfirmation: boolean;
  isSignedIn: boolean;
}

export const initialAutState: AuthState = {
  email: null,
  showCodeConfirmation: false,
  loading: true,
  isSignedIn: false,
};

export const authReducer = (state = initialAutState, action: any) => {
  switch (action.type) {
    case VERIFY_USER:
      return {
        ...state,
        email: action.payload,
        showCodeConfirmation: true,
      };
    case UNDO_VERIFICATION_CODE:
      return {
        ...state,
        email: null,
        showCodeConfirmation: false,
      };
    case SEND_NEW_CONFIRM_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case SEND_NEW_CONFIRM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SIGN_IN_CODE_CONFIRMATION:
      return {
        ...state,
        email: action.payload,
        isSignedIn: false,
        loading: false,
        showCodeConfirmation: true,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isSignedIn: false,
        loading: false,
      };
    case SIGNED_UP:
      return {
        ...state,
        email: action.payload,
        loading: false,
        showCodeConfirmation: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CODE_CONFIRMED:
      return {
        ...state,
        loading: false,
        email: null,
        showCodeConfirmation: false,
      };
    case CODE_CONFIRM_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case SIGNED_OUT:
      return {
        ...state,
        isSignedIn: false,
      };
    case SIGNED_IN:
      return {
        ...state,
        isSignedIn: true,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
