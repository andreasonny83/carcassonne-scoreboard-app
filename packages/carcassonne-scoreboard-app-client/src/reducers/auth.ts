import {
  VERIFY_USER,
  CODE_VERIFIED,
  UNDO_VERIFICATION_CODE,
  LOADING,
  SIGNED_IN,
  SIGNED_OUT,
  SIGN_IN_FAILURE,
  SIGN_IN_CODE_CONFIRMATION,
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
    case CODE_VERIFIED:
      return {
        ...state,
        email: null,
        showCodeConfirmation: false,
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
