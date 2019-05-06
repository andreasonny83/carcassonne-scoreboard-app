import Axios, { AxiosResponse } from 'axios';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  ISignUpResult,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

import { config, IConfig } from '../config';

interface IErrorCode {
  code?: string;
  name?: string;
  message?: string;
}

class AdminController {
  private userPool: CognitoUserPool;
  private poolRegion: string;

  constructor(appConfig: IConfig) {
    this.poolRegion = appConfig.get('APP_REGION') || '';
    const poolId = appConfig.get('APP_USER_POOL_ID') || '';
    const ClientId = appConfig.get('APP_APP_CLIENT_ID') || '';

    const poolData = {
      UserPoolId: poolId,
      ClientId,
    };

    this.userPool = new CognitoUserPool(poolData);
  }

  public register(username: string, password: string): Promise<number> {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: username,
      }),
    ];

    return new Promise(res => {
      this.userPool.signUp(
        username,
        password,
        attributeList,
        [],
        (err: Error | undefined, result: ISignUpResult | undefined) => {
          if (err || !result) {
            console.log(err);
            return res(403);
          }

          const cognitoUser: CognitoUser = result.user;

          console.log('user name is ' + cognitoUser.getUsername());
          console.log('result is:', result);
          return res(201);
        }
      );
    });
  }

  public confirmCode(username: string, code: string): Promise<number> {
    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Promise(res => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log(err);
          return res(400);
        }

        console.log('call result: ' + result);
        res(200);
      });
    });
  }

  public newConfirmCode(username: string): Promise<number> {
    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Promise(res => {
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          console.log(err);
          return res(400);
        }

        console.log(result);
        res(200);
      });
    });
  }

  public async ValidateToken(token: string) {
    const url = `https://cognito-idp.${
      this.poolRegion
    }.amazonaws.com/${this.userPool.getUserPoolId()}/.well-known/jwks.json`;
    let response: AxiosResponse;

    try {
      response = await Axios.get(url);
    } catch (err) {
      throw new Error('Something went wrong while verifying the JWT');
    }

    if (!(response && response.status === 200 && response.data)) {
      throw new Error('Error! Unable to download JWKs');
    }

    const body = response.data;
    const pems: any = {};
    const keys = body.keys;

    for (const key of keys) {
      // Convert each key to PEM
      const keyId: string = key.kid;
      const modulus: string = key.n;
      const exponent: string = key.e;
      const keyType: string = key.kty;
      const jwk = { kty: keyType, n: modulus, e: exponent };
      const currPem: string = jwkToPem(jwk);

      pems[keyId] = currPem;
    }

    // validate the token
    const decodedJwt: any = jwt.decode(token, { complete: true });

    if (!decodedJwt) {
      throw new Error('Not a valid JWT token');
    }

    const jwtHeader: any = decodedJwt && decodedJwt.header;
    const kid = jwtHeader.kid;

    const pem = pems[kid];

    if (!pem) {
      throw new Error('Invalid token');
    }

    return new Promise((res: any) => {
      jwt.verify(token, pem, (err: any, payload: any) => {
        if (err) {
          throw new Error('Invalid Token.');
        }

        return res({ status: 200, data: payload });
      });
    });
  }
}

export const adminController = new AdminController(config);
