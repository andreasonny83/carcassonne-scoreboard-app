import AWS, { AWSError } from 'aws-sdk';
import { DataSource } from 'apollo-datasource';
import { AttributeMap, GetItemOutput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';

import { User, UserAttributes, UserGame } from './user.data';
import { config } from '../config';
import { required } from './utils';
import { Game } from './game.data';

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

  public async getUsers(): Promise<number> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: AWS_CONFIG.usersTableName,
      Select: 'COUNT',
    };

    const users: PromiseResult<ScanOutput, AWSError> = await this.dynamoDb.scan(params).promise();

    return users.Count || 0;
  }

  public async joinGame(userId: string = required('User Id'), game: Game = required('Game')) {
    const user = await this.getUser(userId);

    if (!user) {
      throw new Error('Cannot get current user information');
    }

    const index = user.games.findIndex(currGame => game.id === currGame.gameId);
    const gameIdMatches = index >= 0 && user.games[index].gameId === game.id;

    if (gameIdMatches) {
      return user;
    }

    const gameUpdated: UserGame = {
      gameId: game.id,
      finished: game.finished,
      date: game.date,
    };

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: AWS_CONFIG.usersTableName,
      Key: { id: userId },
      UpdateExpression: 'SET #games = list_append(#games, :game)',
      ExpressionAttributeNames: {
        '#games': 'games',
      },
      ExpressionAttributeValues: {
        ':game': [
          {
            gameId: gameUpdated.gameId,
            finished: gameUpdated.finished,
            date: gameUpdated.date,
          },
        ],
      },
    };

    await this.dynamoDb.update(params).promise();
    user.games[index] = gameUpdated;

    return user;
  }

  public async endGame(game: Game = required('Game')) {
    const users = game.users;

    if (!users.length) {
      throw new Error('Missing users for the selected game');
    }

    for (const user of users) {
      await this.endUserGame(user, game);
    }

    return;
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
    };
  }

  private async endUserGame(
    userId: string = required('User Id'),
    game: Game = required('Game'),
  ) {
    const user = await this.getUser(userId);

    if (!user) {
      throw new Error(`Cannot find user ${userId}`);
    }

    const gameIndex = user.games.findIndex(currGame => game.id === currGame.gameId);
    const PlayersSorted = game.players.sort((a, b) => b.score - a.score);

    if (!Boolean(~gameIndex)) {
      return;
    }

    const victories = PlayersSorted[0].userId === userId ? user.victories + 1 : user.victories;

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: AWS_CONFIG.usersTableName,
      Key: { id: userId },
      UpdateExpression: `SET games[${gameIndex}].finished = :gameUpdated, #victories = :victories`,
      ExpressionAttributeNames: {
        '#victories': 'victories',
      },
      ExpressionAttributeValues: {
        ':gameUpdated': true,
        ':victories': victories,
      },
    };

    return this.dynamoDb.update(params).promise();
  }
}
