// 'use strict';

// const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// const AWS = require('aws-sdk');
// const request = require('request');
// const jwkToPem = require('jwk-to-pem');
// const jwt = require('jsonwebtoken');

// const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
// const poolData = {
//   UserPoolId: 'us-east-1_y3twftbCG', // Your user pool id here
//   ClientId: '7r7crlece3luan294es99dkk3d', // Your client id here
// };
// const pool_region = 'us-east-1';
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// global.fetch = require('node-fetch');

// const register = () => {
//   var attributeList = [];
//   attributeList.push(
//     new AmazonCognitoIdentity.CognitoUserAttribute({
//       Name: 'email',
//       Value: 'andreasonny83@gmail.com',
//     })
//   );
//   attributeList.push(
//     new AmazonCognitoIdentity.CognitoUserAttribute({
//       Name: 'nickname',
//       Value: 'andreasonny83',
//     })
//   );

//   userPool.signUp(
//     'andreasonny83@gmail.com',
//     'SamplePassword123',
//     attributeList,
//     null,
//     function(err, result) {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       cognitoUser = result.user;
//       console.log('user name is ' + cognitoUser.getUsername());
//     }
//   );
// };

// const login = (username, password) => {
//   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//     Username: username,
//     Password: password,
//   });

//   var userData = {
//     Username: username,
//     Pool: userPool,
//   };

//   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//   cognitoUser.authenticateUser(authenticationDetails, {
//     onSuccess: function(result) {
//       console.log('access token + ' + result.getAccessToken().getJwtToken());
//       console.log('id token + ' + result.getIdToken().getJwtToken());
//       console.log('refresh token + ' + result.getRefreshToken().getToken());
//     },
//     onFailure: function(err) {
//       console.log(err);
//     },
//   });
// };

// module.exports = {
//   login,
//   register
// };
