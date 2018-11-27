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

          return res({ status: 404, error: true });
        },
      });
    });
  }

  public ValidateToken(token: string) {
    const url = `https://cognito-idp.${
      this.poolRegion
    }.amazonaws.com/${this.userPool.getUserPoolId()}/.well-known/jwks.json`;

    return Axios.get(url).then(async (response: AxiosResponse) => {
      if (response.status === 200 && response.data) {
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
          console.log('Not a valid JWT token');
          return { status: 400, error: true };
        }

        const jwtHeader: any = decodedJwt && decodedJwt.header;
        const kid = jwtHeader.kid;

        const pem = pems[kid];

        if (!pem) {
          console.log('Invalid token');
          return { status: 400, error: true };
        }

        return new Promise((res: any) => {
          jwt.verify(token, pem, (err: any, payload: any) => {
            if (err) {
              console.log('Invalid Token.');
              return res({ status: 400, error: true });
            } else {
              console.log('Valid Token.');
              console.log(payload);
              return res({ status: 200, data: payload });
            }
          });
        });
      } else {
        console.log('Error! Unable to download JWKs');
        return { status: 400, error: true };
      }
    });
  }
}

export const adminController = new AdminController();
