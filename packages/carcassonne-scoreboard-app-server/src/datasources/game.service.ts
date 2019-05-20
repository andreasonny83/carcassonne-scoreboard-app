import AWS, { AWSError } from 'aws-sdk';
import { DataSource } from 'apollo-datasource';
import { PromiseResult } from 'aws-sdk/lib/request';
import { GetItemOutput, AttributeMap, ScanOutput } from 'aws-sdk/clients/dynamodb';

import { Game, PlayerInput, IPlayer } from './game.data';
import { config } from '../config';
import { required } from './utils';
import { ValidationError } from 'apollo-server';

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

  public async getGames(): Promise<number> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: AWS_CONFIG.gamesTableName,
      FilterExpression: 'finished = :finished',
      ExpressionAttributeValues: {
        ':finished': true,
      },
      Select: 'COUNT',
    };

    const users: PromiseResult<ScanOutput, AWSError> = await this.dynamoDb.scan(params).promise();

    return users.Count || 0;
  }

  public async joinGame(
    userId: string = required('User Id'),
    gameId: string = required('Game Id')
  ) {
    const game = await this.getGame(gameId);

    if (!game) {
      throw new Error('Cannot find game Id');
    }

    const index = game.users.indexOf(userId);
    const userIdMatches = game.users[index] === userId;

    if (userIdMatches) {
      return game;
    }

    const users: string[] = [...game.users, userId];

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: AWS_CONFIG.gamesTableName,
      Key: { id: gameId },
      UpdateExpression: 'SET #users = :users',
      ExpressionAttributeValues: {
        ':users': users,
      },
      ExpressionAttributeNames: {
        '#users': 'users',
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

    const newLog = {
      id: Date.now(),
      score: newScore,
      points: newScore - game.players[playerIndex].score,
      userId: game.players[playerIndex].id,
      color: game.players[playerIndex].color,
    };

    if (game) {
      const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: AWS_CONFIG.gamesTableName,
        Key: { id: gameId },
        UpdateExpression: `SET players[${playerIndex}].score = :newScore, #log = list_append(#log, :log)`,
        ExpressionAttributeNames: {
          '#log': 'log',
        },
        ExpressionAttributeValues: {
          ':newScore': newScore,
          ':log': [newLog],
        },
      };

      await this.dynamoDb.update(params).promise();
      game.players[playerIndex].score = newScore;
      game.log.push(newLog);

      return game;
    }

    throw new Error('Invalid game');
  }

  public async undoMove(gameId: string = required('Game Id')) {
    const game = await this.getGame(gameId);

    if (game.log.length < 1) {
      return game;
    }

    let playerIndex: number | undefined;
    const lastMoveLog = game.log.pop();

    if (!lastMoveLog) {
      return game;
    }

    const targetPlayerData = game.players.find((player: IPlayer, index: number) => {
      if (player.id === lastMoveLog.userId) {
        playerIndex = index;
        return true;
      }

      return false;
    });

    if (!targetPlayerData || typeof playerIndex === 'undefined') {
      throw new Error('Invalid log information');
    }

    targetPlayerData.score -= lastMoveLog.points;

    if (game) {
      const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: AWS_CONFIG.gamesTableName,
        Key: { id: gameId },
        UpdateExpression: `SET #log = :log, players[${playerIndex}] = :targetPlayerData`,
        ExpressionAttributeNames: {
          '#log': 'log',
        },
        ExpressionAttributeValues: {
          ':log': game.log,
          ':targetPlayerData': targetPlayerData,
        },
      };

      await this.dynamoDb.update(params).promise();

      return { ...game };
    }

    throw new Error('Invalid game');
  }

  public async updatePlayer(
    gameId: string = required('Game Id'),
    playerData: IPlayer = required('Player Data'),
    playerIndex: number = required('Player Index')
  ) {
    const game = await this.getGame(gameId);

    if (game) {
      const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
        TableName: AWS_CONFIG.gamesTableName,
        Key: { id: gameId },
        UpdateExpression: `SET players[${playerIndex}] = :newPlayerData`,
        ExpressionAttributeValues: {
          ':newPlayerData': playerData,
        },
      };

      await this.dynamoDb.update(params).promise();
      game.players[playerIndex] = playerData;

      return game;
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

  public async endGame(game: Game = required('Game')) {
    if (game.finished) {
      throw new Error('Cannot end this game. The game is already finished.');
    }

    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: AWS_CONFIG.gamesTableName,
      Key: { id: game.id },
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
}
