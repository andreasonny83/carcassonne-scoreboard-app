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

export const signedOut = () => async (dispatch: Dispatch) => {
  dispatch(push('/login'));
};

export const signOut = () => async (dispatch: Dispatch) => {
  await Auth.signOut();

  dispatch({
    type: SIGNED_OUT,
  });
};

export const toggleLoading = (isLoading: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: LOADING,
    payload: isLoading,
  });
};

export const userSignedIn = () => (dispatch: Dispatch) => {
  dispatch({
    type: SIGNED_IN,
  });
};

export const signIn = (data: SignInData) => async (dispatch: Dispatch) => {
  try {
    await Auth.signIn(data.username, data.password);
  } catch (err) {
    if (err.code === 'UserNotConfirmedException') {
      return dispatch({
        type: SIGN_IN_CODE_CONFIRMATION,
        payload: data.username,
      });
    }

    return dispatch({
      type: SIGN_IN_FAILURE,
    });
  }

  dispatch({
    type: SIGNED_IN,
  });
};

export const verifyUser = (email: string) => (dispatch: Dispatch) => {
  dispatch({
    type: VERIFY_USER,
    payload: email,
  });
};

export const codeVerified = () => (dispatch: Dispatch) => {
  dispatch({
    type: CODE_VERIFIED,
  });
};

export const undoCodeVerification = () => (dispatch: Dispatch) => {
  dispatch({
    type: UNDO_VERIFICATION_CODE,
  });
};
