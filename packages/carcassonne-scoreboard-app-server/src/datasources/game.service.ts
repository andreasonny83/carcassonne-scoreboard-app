import AWS, { AWSError } from 'aws-sdk';
import { DataSource } from 'apollo-datasource';
import { PromiseResult } from 'aws-sdk/lib/request';
import { GetItemOutput, AttributeMap } from 'aws-sdk/clients/dynamodb';

import { Game, PlayerInput } from './game.data';
import { config } from '../config';
import { required } from './utils';

type IGame = AttributeMap & Game;

const AWS_CONFIG = {
  gamesTableName: config.get('APP_DB_GAMES_TABLE_NAME'),
  awsRemoteConfig: {
    endpoint: `https://dynamodb.${config.get('APP_DB_REGION')}.amazonaws.com`,
    region: config.get('APP_DB_REGION'),
    accessKeyId: config.get('APP_DB_ACCESS_KEY'),
    secretAccessKey: config.get('APP_DB_SECRET'),
  },
};

export interface NewGameInput {
  gameName: string;
  players: PlayerInput[];
}

export class GameService extends DataSource {
  public dynamoDb: AWS.DynamoDB.DocumentClient;

  constructor() {
    super();
    AWS.config.update(AWS_CONFIG.awsRemoteConfig);
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
  }

  public async createGame(gameObject: NewGameInput, userId: string): Promise<Game> {
    const newGame = new Game(gameObject.gameName, gameObject.players, [userId]);

    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: AWS_CONFIG.gamesTableName,
      Item: newGame,
    };

    try {
      await this.dynamoDb.put(params).promise();
    } catch (err) {
      throw new Error(err);
    }

    return newGame;
  }

  public async getGame(gameId: string = required('Game Id')): Promise<Game> {
    const param: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: AWS_CONFIG.gamesTableName,
      Key: { id: gameId },
    };

    const game: PromiseResult<GetItemOutput, AWSError> = await this.dynamoDb.get(param).promise();

    if (!game.Item) {
      throw new Error('Cannot find Game ID');
    }

    return game.Item as IGame;
  }

  public async joinGame(
    userId: string = required('User Id'),
    gameId: string = required('Game Id')
  ) {
    const game = await this.getGame(gameId);

    if (!game) {
      throw new Error('Cannot find game Id');
    }

    const users: string[] = [...game.users, userId];

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: AWS_CONFIG.gamesTableName,
      Key: { id: gameId },
      UpdateExpression: 'SET users = :users',
      ExpressionAttributeValues: {
        ':users': users,
      },
    };

    await this.dynamoDb.update(params).promise();

    return {
      ...game,
      users,
    };
  }

  public async updateScore(
    gameId: string = required('Game Id'),
    newScore: number = required('New Score'),
    playerIndex: number = required('Player Index')
  ) {
    const game = await this.getGame(gameId);

    if (game) {
      const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: AWS_CONFIG.gamesTableName,
        Key: { id: gameId },
        UpdateExpression: `SET players[${playerIndex}].score = :newScore`,
        ExpressionAttributeValues: {
          ':newScore': newScore,
        },
      };

      await this.dynamoDb.update(params).promise();
      const gameUpdated = await this.getGame(gameId);

      return gameUpdated;
    }

    throw new Error('Invalid game');
  }

  public async startGame(gameId: string = required('Game Id')) {
    const game = await this.getGame(gameId);

    if (game) {
      if (game.started) {
        return game;
      }

      const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: AWS_CONFIG.gamesTableName,
        Key: { id: gameId },
        UpdateExpression: 'SET started = :started',
        ExpressionAttributeValues: {
          ':started': true,
        },
      };

      await this.dynamoDb.update(params).promise();

      return {
        ...game,
        started: true,
      };
    }

    throw new Error('Invalid game');
  }

  public async endGame(gameId: string = required('Game Id')) {
    const game = await this.getGame(gameId);

    if (game) {
      if (game.finished) {
        throw new Error('Cannot end this game. The game is already finished.');
      }

      const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: AWS_CONFIG.gamesTableName,
        Key: { id: gameId },
        UpdateExpression: 'SET finished = :finished',
        ExpressionAttributeValues: {
          ':finished': true,
        },
      };

      await this.dynamoDb.update(params).promise();
      return {
        ...game,
        finished: true,
      };
    }

    throw new Error('Invalid game');
  }

  public getGames() {
    // return this.games;
  }
}
