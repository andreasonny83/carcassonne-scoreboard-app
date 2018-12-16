import { Auth } from 'aws-amplify';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

export const SIGN_OUT = '@@AUTH/SIGN_OUT';
export const SIGN_IN = '@@AUTH/SIGN_IN';


export const signOut = () => async (disapatch: Dispatch) => {
  await Auth.signOut();

  disapatch({
    type: SIGN_OUT,
  });

  disapatch(push('/login'));
};

export const signIn = () => (disapatch: Dispatch) => {
  disapatch({
    type: SIGN_IN,
  });

  disapatch(push('/'));
};

