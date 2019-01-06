import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  ISignUpResult,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import Axios, { AxiosResponse } from 'axios';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';

interface IErrorCode {
  code?: string;
  name?: string;
  message?: string;
}

class AdminController {
  private userPool: CognitoUserPool;
  private poolRegion: string;

  constructor() {
    this.poolRegion = 'us-east-1';
    const poolId = 'y3twftbCG'; // Your user pool id here
    const ClientId = '7r7crlece3luan294es99dkk3d'; // Your client id here

    const poolData = {
      UserPoolId: `${this.poolRegion}_${poolId}`,
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
      new CognitoUserAttribute({
        Name: 'nickname',
        Value: 'andreasonny83',
      }),
    ];

    return new Promise(res => {
      this.userPool.signUp(
        username,
        password,
        attributeList,
        [],
        (err: Error | undefined, result: ISignUpResult | undefined) => {
          if (err) {
            console.log(err);
            return res(403);
          }

          const cognitoUser: CognitoUser = result!.user;

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

  public login(
    username: string,
    password: string
  ): Promise<{ status: number; data?: any; error?: boolean }> {
    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails: AuthenticationDetails = new AuthenticationDetails(
      authenticationData
    );

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser: CognitoUser = new CognitoUser(userData);

    return new Promise(res => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result: CognitoUserSession) => {
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.getIdToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();

          return res({ status: 200, data: { accessToken, idToken, refreshToken } });
        },
        onFailure: (err: IErrorCode) => {
          console.log(err);

          if (err && err.code === 'UserNotConfirmedException') {
            return res({ status: 223, error: true });
          }

          return res({ status: 401, error: true });
        },
      });
    });
  }

  public async ValidateToken(token: string) {
    let response: AxiosResponse;
    const url = `https://cognito-idp.${
      this.poolRegion
    }.amazonaws.com/${this.userPool.getUserPoolId()}/.well-known/jwks.json`;

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
        } else {
          console.log('Valid Token.');
          return res({ status: 200, data: payload });
        }
      });
    });
  }

  public getUser(username: string) {
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser: CognitoUser = new CognitoUser(userData);

    // console.log('userdata', userData);
    // console.log(cognitoUser);

    return;

    if (cognitoUser !== null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log('session validity: ' + session.isValid());

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: '...', // your identity pool id here
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': session
              .getIdToken()
              .getJwtToken(),
          },
        });

        // Instantiate aws sdk service objects now that the credentials have been updated.
        // example: var s3 = new AWS.S3();
      });
    }
  }
}

export const adminController = new AdminController();
