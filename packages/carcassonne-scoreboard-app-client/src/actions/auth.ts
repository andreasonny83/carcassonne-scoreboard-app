import { Auth } from 'aws-amplify';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import {
  SIGNED_OUT,
  SIGNED_IN,
  UNDO_VERIFICATION_CODE,
  CODE_VERIFIED,
  VERIFY_USER,
  SIGN_IN_CODE_CONFIRMATION,
  SIGN_IN_FAILURE,
  LOADING,
} from '../constants';

export interface SignInData {
  username: string;
  password: string;
}

export const signedOut = () => async (disapatch: Dispatch) => {
  disapatch(push('/login'));
};

export const signedIn = () => async (disapatch: Dispatch) => {
  disapatch(push('/'));
};

export const signOut = () => async (disapatch: Dispatch) => {
  await Auth.signOut();

  disapatch({
    type: SIGNED_OUT,
  });
};

export const toggleLoading = (isLoading: boolean) => (disapatch: Dispatch) => {
  disapatch({
    type: LOADING,
    payload: isLoading,
  });
};

export const userSignedIn = () => (disapatch: Dispatch) => {
  disapatch({
    type: SIGNED_IN,
  });
}

export const signIn = (data: SignInData) => async (disapatch: Dispatch) => {
  try {
    await Auth.signIn(data.username, data.password);
  } catch (err) {
    if (err.code === 'UserNotConfirmedException') {
      return disapatch({
        type: SIGN_IN_CODE_CONFIRMATION,
        payload: data.username,
      });
    }

    return disapatch({
      type: SIGN_IN_FAILURE,
    });
  }

  disapatch({
    type: SIGNED_IN,
  });
};

export const verifyUser = (email: string) => (disapatch: Dispatch) => {
  disapatch({
    type: VERIFY_USER,
    payload: email,
  });
};

export const codeVerified = () => (disapatch: Dispatch) => {
  disapatch({
    type: CODE_VERIFIED,
  });
};

export const undoCodeVerification = () => (disapatch: Dispatch) => {
  disapatch({
    type: UNDO_VERIFICATION_CODE,
  });
};
