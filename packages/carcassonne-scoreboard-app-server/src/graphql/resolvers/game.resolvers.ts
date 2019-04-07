import { ValidationError, PubSub } from 'apollo-server';
import get from 'lodash/get';
const pubsub = new PubSub();

import { dataSources } from '../../datasources';
import { IGame } from '../../datasources/game.data';

const validMeepleColor = ['green', 'red', 'blue', 'yellow', 'black', 'gray'];
const sanitizeInput = (input: any) =>
  String(input)
    .replace(/[^\w\s]|\s{2,}/g, '')
    .trim();
const validateColor = (color: any) => Boolean(~validMeepleColor.indexOf(color)) && String(color);
const validatePlayer = (playerName: string) => {
  const playerNumber = Number(playerName.replace(/player/, ''));
  if (playerNumber > 0 && playerNumber < 7) {
    return `player${playerNumber}`;
  }

  return false;
};

const GAME_UPDATED = 'GAME_UPDATED';

export default {
  Query: {
    game(parent: any, args: any, context: any): IGame {
      // if (context.authScope !== 'ADMIN') {
      //   throw new AuthenticationError('not admin');
      // }

      const { gameId } = args;
      const game = dataSources.gameService.getGame(gameId);

      if (game) {
        return game;
      }

      // throw new ApolloError(`Game ${args.id} does not exist`);
      throw new ValidationError(`Game ID not found`);
    },

    games() {
      return dataSources.gameService.getGames();
    },
  },

  Subscription: {
    gameUpdated: {
      subscribe: (root: any, args: any, context: any) => {
        console.log('root', root);
        console.log('args', args);
        console.log('context', context);
        return pubsub.asyncIterator(GAME_UPDATED);
      },
    },
  },

  Mutation: {
    newGame: async (parent: any, args: any, context: any) => {
      const { gameName, players } = args;
      const userId = get(context, 'userData.data.username');
      const sanitizedGameName = sanitizeInput(gameName);
      const sanitizedPlayers = players.map((player: any) => {
        const { name, color, key } = player;

        console.log('name', name);
        console.log('color', color);
        console.log('key', key);

        if (!(name && color && key)) {
          throw new ValidationError(`Invalid request`);
        }

        const meepleColor = validateColor(color);
        const playerKey = validatePlayer(key);

        if (!(meepleColor && playerKey)) {
          throw new ValidationError(`Invalid request`);
        }

        return {
          name: sanitizeInput(player.name),
          color: meepleColor,
          key: playerKey,
        };
      });

      const isValidRequest =
        sanitizedGameName && sanitizedPlayers && Array.isArray(players) && players.length < 7;

      if (!isValidRequest) {
        throw new ValidationError(`Invalid request`);
      }

      const gameObj = {
        gameName: sanitizedGameName,
        players: sanitizedPlayers,
      };

      if (userId) {
        const game: any = dataSources.gameService.createGame(gameObj, userId);

        return dataSources.gameService.getGame(game.id);
      }

      throw new ValidationError(`Unauthenticated user request`);
    },

    joinGame(parent: any, args: any, context: any) {
      const { gameId } = args;
      const userId =
        context && context.userData && context.userData.data && context.userData.data.username;
      const game = dataSources.gameService.getGame(gameId);

      if (!userId) {
        console.log('Unauthenticated user request');
        throw new ValidationError(`Unauthenticated user request`);
      }
      if (!game) {
        console.log('GameID not found');
        throw new ValidationError(`GameID not found`);
      }

      const index = game.users.indexOf(userId);
      const userIdMatches = game.users[index] === userId;
      console.log('game.users', game.users);
      console.log('index', index);
      console.log('userIdMatches', userIdMatches);

      if (!userIdMatches) {
        const gameUpdated = {
          ...game,
          users: [...game.users, userId],
        };

        dataSources.gameService.updateGame(gameUpdated);
      }

      return dataSources.gameService.getGame(gameId);
    },

    startGame(parent: any, args: any, context: any) {
      const { gameId } = args;
      const userId = context.userData && context.userData.data && context.userData.data.username;
      const game = dataSources.gameService.getGame(gameId);

      if (!userId) {
        throw new ValidationError(`Unauthenticated user request`);
      }
      if (!game) {
        throw new ValidationError(`GameID not found`);
      }

      const index = game.users.indexOf(userId);
      const userIdMatches = game.users[index] === userId;

      if (userIdMatches) {
        let gameUpdated;

        if (!game.started) {
          dataSources.gameService.startGame(gameId);
          gameUpdated = dataSources.gameService.getGame(gameId);
          pubsub.publish(GAME_UPDATED, { gameUpdated });
        }

        return gameUpdated;
      }

      throw new ValidationError(`Unauthenticated user request`);
    },

    updateGame(parent: any, args: any, context: any) {
      const { gameId, playerKey, score } = args;
      const userId = context.userData && context.userData.data && context.userData.data.username;
      const game = dataSources.gameService.getGame(gameId);

      if (!userId) {
        throw new ValidationError(`Unauthenticated user request`);
      }
      if (!game) {
        throw new ValidationError(`GameID not found`);
      }

      if (!game.started) {
        throw new ValidationError(`Game not yet started`);
      }

      if (game.finished) {
        throw new ValidationError(`Cannot update a finished game`);
      }

      const index = game.users.indexOf(userId);
      const userIdMatches = game.users[index] === userId;

      if (!userIdMatches) {
        throw new ValidationError(`Unauthenticated user request`);
      }

      const playersUpdated = game.players.map(player => {
        if (player.key === playerKey) {
          return {
            ...player,
            score: (player.score || 0) + score,
          };
        }
        return player;
      });

      const gameUpdated = dataSources.gameService.updateGame({ ...game, players: playersUpdated });
      pubsub.publish(GAME_UPDATED, { gameUpdated });

      return gameUpdated;
    },
  },
};
