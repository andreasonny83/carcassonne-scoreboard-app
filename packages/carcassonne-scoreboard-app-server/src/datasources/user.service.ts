import AWS, { AWSError } from 'aws-sdk';
import { DataSource } from 'apollo-datasource';
import { AttributeMap, GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';

import { User, UserAttributes } from './user.data';
import { config } from '../config';
import { required } from './utils';

export type IUser = AttributeMap & User;

const AWS_CONFIG = {
  usersTableName: config.get('APP_DB_USERS_TABLE_NAME'),
  awsRemoteConfig: {
    endpoint: `https://dynamodb.${config.get('APP_DB_REGION')}.amazonaws.com`,
    region: config.get('APP_DB_REGION'),
    accessKeyId: config.get('APP_DB_ACCESS_KEY'),
    secretAccessKey: config.get('APP_DB_SECRET'),
  },
};

export class UserService extends DataSource {
  public dynamoDb: AWS.DynamoDB.DocumentClient;

  constructor() {
    super();
    AWS.config.update(AWS_CONFIG.awsRemoteConfig);
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
  }

  public async createUser(userId: string): Promise<IUser> {
    const newUser = new User(userId);

    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: AWS_CONFIG.usersTableName,
      Item: newUser,
    };

    await this.dynamoDb.put(params).promise();

    return newUser as IUser;
  }

  public async getUser(userId: string = required('User Id')): Promise<IUser> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: AWS_CONFIG.usersTableName,
      Key: { id: userId },
    };

    const user: PromiseResult<GetItemOutput, AWSError> = await this.dynamoDb.get(params).promise();

    if (!user.Item) {
      throw new Error('Cannot find user Id');
    }

    return user.Item as IUser;
  }

  public async joinGame(
    userId: string = required('User Id'),
    gameId: string = required('Game Id')
  ) {
    const user = await this.getUser(userId);

    if (!user) {
      throw new Error('Cannot get current user information');
    }

    const games: string[] = [...user.games, gameId];

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: AWS_CONFIG.usersTableName,
      Key: { id: userId },
      UpdateExpression: 'SET games = :games',
      ExpressionAttributeValues: {
        ':games': games,
      },
    };

    await this.dynamoDb.update(params).promise();

    return {
      ...user,
      games,
    };
  }

  public async updateUser(
    userId: string = required('User Id'),
    attributes: UserAttributes = required('User Attributes')
  ) {
    const user = await this.getUser(userId);

    if (!user) {
      throw new Error('Cannot get current user information');
    }

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: AWS_CONFIG.usersTableName,
      Key: { id: userId },
      UpdateExpression: 'SET picture = :picture, nickname = :nickname',
      ExpressionAttributeValues: {
        ':picture': attributes.picture,
        ':nickname': attributes.nickname,
      },
    };

    await this.dynamoDb.update(params).promise();

    return {
      ...user,
      picture: attributes.picture,
      nickname: attributes.nickname,
    }
  }
}
