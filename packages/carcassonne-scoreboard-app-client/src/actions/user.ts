import { Auth } from 'aws-amplify';
import { Dispatch } from 'redux';

import { USER_UPDATE, USER_UPDATED } from '../constants';

const formatUserData = (userData: any) => {
  const userAttributes = userData && userData.attributes;

  return (
    userAttributes && {
      username: userAttributes.sub,
      email: userAttributes.email,
      nickname: userAttributes.nickname,
      picture: userAttributes.picture,
    }
  );
};

export const updateUserData = (userData: any) => async (dispatch: Dispatch) => {
  let user;

  try {
    user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, userData);
    user = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });
  } catch (err) {
    return;
  }

  return dispatch({
    type: USER_UPDATED,
    payload: formatUserData(user),
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
    payload: formatUserData(user),
  });
};
