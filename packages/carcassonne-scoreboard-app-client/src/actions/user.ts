import { Auth } from 'aws-amplify';
import { Dispatch } from 'redux';

import { USER_UPDATE, USER_UPDATED } from '../constants';

interface CognitoUser {
  username: string;
  attributes: {
    email: string;
    email_verified: boolean;
    sub: string;
  };
}

const getUsername = (userData: CognitoUser) => userData.attributes.sub;

interface UserData {
  nickname: string;
  username: string;
  picture: string;
}

export const updateUserData = (userData: Partial<UserData>) => async (dispatch: Dispatch) => {
  return dispatch({
    type: USER_UPDATED,
    payload: userData,
  });
};

export const getUserData = () => async (dispatch: Dispatch) => {
  let user;

  try {
    user = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });
  } catch (err) {
    throw new Error();
  }

  return dispatch({
    type: USER_UPDATE,
    payload: getUsername(user),
  });
};
