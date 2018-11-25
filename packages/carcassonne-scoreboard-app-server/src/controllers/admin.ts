import * as express from 'express';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { validationResult } from 'express-validator/check';

// if (typeof global.fetch !== 'function') {
//   global.fetch = require('node-fetch');
// }

// import AWS from 'aws-sdk';
// import request from 'request';
// import jwkToPem from 'jwk-to-pem';
// import jwt from 'jsonwebtoken';

const poolData = {
  UserPoolId: 'us-east-1_y3twftbCG', // Your user pool id here
  ClientId: '7r7crlece3luan294es99dkk3d', // Your client id here
};
const poolRegion = 'us-east-1';
const userPool: CognitoUserPool = new CognitoUserPool(poolData);

class AdminController {
  public register(req: express.Request, res: express.Response) {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('validationResult', errors.array());
      return res.sendStatus(403);
    }

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

    userPool.signUp(username, password, attributeList, [], (err, result: any) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      const cognitoUser = result.user;

      console.log('user name is ' + cognitoUser.getUsername());
      console.log('result is:', result);
      return res.sendStatus(201);
    });
  }

  public login(req: express.Request, res: express.Response) {
    //
  }
}

export const adminController = new AdminController();
