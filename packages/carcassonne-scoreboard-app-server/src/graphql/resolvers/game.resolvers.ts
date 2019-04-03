import { ValidationError, PubSub } from 'apollo-server';
import get from 'lodash/get';

import { dataSources } from '../../datasources';

const pubsub = new PubSub();

const validMeepleColor = ['green', 'red', 'blue', 'yellow', 'black', 'gray'];
const sanitizeInput = (input: any) => String(input).replace(/[^\w\s]|\s{2,}/g, '').trim();
const validateColor = (color: any) => Boolean(~validMeepleColor.indexOf(color)) && String(color);
const validatePlayer = (playerName: string) => {
  const playerNumber = Number(playerName.replace(/player/, ''));
  if (playerNumber > 0 && playerNumber < 7) {
    return `player${playerNumber}`;
  }

  return false;
}

const AUTHOR_MUTATED = 'test';

export default {
  Query: {
    game(parent: any, args: any, context: any) {
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
    connectGames: {
      subscribe: () => {
        return pubsub.asyncIterator([AUTHOR_MUTATED])
      }
    }
  },

  Mutation: {
    newGame(parent: any, args: any, context: any) {
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
          key: playerKey
        }
      });

      const isValidRequest = sanitizedGameName && sanitizedPlayers && Array.isArray(players) && players.length < 7;

      if (!isValidRequest) {
        throw new ValidationError(`Invalid request`);
      }

      const gameObj = {
        gameName: sanitizedGameName,
        players: sanitizedPlayers,
      }

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
      const userId =
        context && context.userData && context.userData.data && context.userData.data.username;
      const game = dataSources.gameService.getGame(gameId);

      if (!userId) {
        throw new ValidationError(`Unauthenticated user request`);
      }
      if (!game) {
        throw new ValidationError(`GameID not found`);
      }

      const index = game.players.indexOf(userId);
      const userIdMatches = game.players[index] === userId;

      if (~index && userIdMatches) {
        dataSources.gameService.startGame(gameId);
        return dataSources.gameService.getGame(gameId);
      }

      throw new ValidationError(`Unauthenticated user request`);
    },
  },
};
