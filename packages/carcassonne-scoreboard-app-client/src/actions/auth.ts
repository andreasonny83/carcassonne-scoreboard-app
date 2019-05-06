import { Auth } from 'aws-amplify';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import axios from 'axios';

import { API_URL } from '../config';
import { showNotification } from './notifications';
import {
  SIGNED_OUT,
  SIGNED_IN,
  UNDO_VERIFICATION_CODE,
  VERIFY_USER,
  SIGN_IN_CODE_CONFIRMATION,
  SIGN_IN_FAILURE,
  SIGNED_UP,
  SIGN_UP_FAILURE,
  LOADING,
  SEND_NEW_CONFIRM_FAILURE,
  SEND_NEW_CONFIRM_SUCCESS,
  CODE_CONFIRM_FAILURE,
  CODE_CONFIRMED,
  FORGOT_PASSWORD,
  PASSWORD_RESET,
  PASSWORD_RESET_FAILED,
} from '../constants';

export interface SignInData {
  username: string;
  password: string;
}

export interface VerifyCodeData {
  username: string;
  code: string;
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

export const forgotPassword = (username: string) => async (dispatch: Dispatch) => {
  try {
    await Auth.forgotPassword(username);
  } catch (err) {
    if (err && err.message) {
      showNotification(err.message)(dispatch);
    } else {
      showNotification('Something went wrong. Please try again later.')(dispatch);
    }
    return;
  }

  dispatch({
    type: FORGOT_PASSWORD,
    payload: username,
  });

  showNotification('Confirmation code correctly sent.')(dispatch);
};

export const resetPassword = (username: string, code: string, newPassword: string) => async (
  dispatch: Dispatch
) => {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword);
  } catch (err) {
    if (err && err.message) {
      showNotification(err.message)(dispatch);
    } else {
      showNotification('Something went wrong. Please try again later.')(dispatch);
    }

    dispatch({
      type: PASSWORD_RESET_FAILED,
    });

    return;
  }

  dispatch({
    type: PASSWORD_RESET,
  });

  showNotification('Password correctly updated')(dispatch);
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
    if (err && err.code === 'UserNotConfirmedException') {
      return dispatch({
        type: SIGN_IN_CODE_CONFIRMATION,
        payload: data.username,
      });
    }

    if (err && err.message) {
      showNotification(err.message)(dispatch);
    } else {
      showNotification('Something went wrong. Please try again later.')(dispatch);
    }

    return dispatch({
      type: SIGN_IN_FAILURE,
    });
  }

  dispatch({
    type: SIGNED_IN,
  });
};

export const signUp = (data: SignInData) => async (dispatch: Dispatch) => {
  try {
    await axios(`${API_URL}/sign-up`, {
      method: 'POST',
      data,
    });
  } catch (err) {
    showNotification(err.message || err)(dispatch);
    return dispatch({
      type: SIGN_UP_FAILURE,
    });
  }

  dispatch({
    type: SIGNED_UP,
    payload: data.username,
  });
};

export const verifyCode = (data: VerifyCodeData) => async (dispatch: Dispatch) => {
  try {
    await Auth.confirmSignUp(data.username, data.code);
  } catch (err) {
    if (err && err.message) {
      showNotification(err.message)(dispatch);
    }

    return dispatch({
      type: CODE_CONFIRM_FAILURE,
    });
  }

  showNotification('Code successfully verified. You can now log in.')(dispatch);
  dispatch({
    type: CODE_CONFIRMED,
  });
};

export const sendNewCode = (data: { username: string }) => async (dispatch: Dispatch) => {
  try {
    await axios(`${API_URL}/new-confirm-code`, {
      method: 'POST',
      data,
    });
  } catch (err) {
    showNotification('Something went wrong. Cannot send a new confirmation code.')(dispatch);
    return dispatch({
      type: SEND_NEW_CONFIRM_FAILURE,
    });
  }

  showNotification('New confirmation code successfully sent.')(dispatch);
  dispatch({
    type: SEND_NEW_CONFIRM_SUCCESS,
  });
};

export const verifyUser = (email: string) => (dispatch: Dispatch) => {
  dispatch({
    type: VERIFY_USER,
    payload: email,
  });
};

export const undoCodeVerification = () => (dispatch: Dispatch) => {
  dispatch({
    type: UNDO_VERIFICATION_CODE,
  });
};
