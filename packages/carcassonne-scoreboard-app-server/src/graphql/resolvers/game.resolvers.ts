import get from 'lodash/get';
import {
  ValidationError,
  UserInputError,
  PubSub,
  ApolloError,
  AuthenticationError,
} from 'apollo-server';

import { dataSources } from '../../datasources';
import { MeepleColor, PlayerInput, Game } from '../../datasources/game.data';
import { NewGameInput } from '../../datasources/game.service';
import { required } from '../../datasources/utils';

const pubsub = new PubSub();

const validMeepleColor: MeepleColor[] = ['green', 'red', 'blue', 'yellow', 'black', 'gray'];

const sanitizeInput = (input: any) =>
  String(input)
    .replace(/[^\w\s]|\s{2,}/g, '')
    .trim();

const validateColor = (color: string): MeepleColor | undefined => {
  const index = validMeepleColor.indexOf(color as MeepleColor);

  if (Boolean(~index)) {
    return validMeepleColor[index];
  }
};

const sanitizePlayers = (players: PlayerInput[]): PlayerInput[] => {
  const playerColors: MeepleColor[] = players.map((player: PlayerInput) => player.color);

  const duplicateColor = playerColors.some(
    (playerColor: MeepleColor, index: Number) => playerColors.indexOf(playerColor) !== index
  );

  if (duplicateColor) {
    throw new UserInputError(
      `Invalid request. Cannot assign the same meeple color to multiple players`
    );
  }

  return players.map((player: PlayerInput) => {
    const { name, color, userId } = player;

    if (!(name && color)) {
      throw new UserInputError(`Invalid request`);
    }

    const meepleColor = validateColor(color);

    if (!meepleColor) {
      throw new UserInputError(`Invalid request`);
    }

    return {
      name: sanitizeInput(player.name),
      color: meepleColor,
      userId,
    };
  });
};

const GAME_UPDATED = 'GAME_UPDATED';
const GAME_UPDATING = 'GAME_UPDATING';

interface GameUpdatingStatus {
  [key: string]: {
    loading: boolean;
  };
}

const GAME_UPDATING_STATUS: GameUpdatingStatus = {};

export default {
  Query: {
    async game(parent: any, args: any, context: any): Promise<Game> {
      const { gameId } = args;
      const game = await dataSources.gameService.getGame(gameId.toLowerCase());

      if (game) {
        return game;
      }

      throw new ValidationError(`Game ID not found`);
    },

    async gameUpdating(parent: any, args: any, context: any) {
      const { gameId } = args;
      const game = GAME_UPDATING_STATUS[gameId];

      return {
        loading: game && game.loading,
      };
    },
  },

  Subscription: {
    gameUpdated: {
      subscribe: (root: any, args: any, context: any) => {
        console.log('gameUpdated');

        console.log('root', root);
        console.log('args', args);
        console.log('context', context);
        return pubsub.asyncIterator(GAME_UPDATED);
      },
    },

    gameUpdating: {
      subscribe: (root: any, args: any, context: any) => pubsub.asyncIterator(GAME_UPDATING),
    },
  },

  Mutation: {
    newGame: async (parent: any, args: any, context: any) => {
      const { input } = args;

      if (!input) {
        throw new UserInputError(`Invalid request`);
      }

      const { name, players } = input;

      if (
        !(name && players && Array.isArray(players) && players.length > 1 && players.length < 7)
      ) {
        throw new UserInputError(`Invalid request`);
      }

      const userId = get(context, 'userData.data.username');
      let userData;

      try {
        userData = await dataSources.userService.getUser(userId);
      } catch (err) {
        throw new AuthenticationError(`Unauthenticated user request`);
      }

      const sanitizedGameName = sanitizeInput(name);
      const sanitizedPlayers = sanitizePlayers(players);

      const isValidRequest = sanitizedGameName && sanitizedPlayers;

      if (!isValidRequest) {
        throw new UserInputError(`Invalid request`);
      }

      sanitizedPlayers[0].userId = userId;
      sanitizedPlayers[0].picture = userData.picture;

      const gameObj: NewGameInput = {
        gameName: sanitizedGameName,
        players: sanitizedPlayers,
      };

      if (userId) {
        let res;

        try {
          res = await dataSources.gameService.createGame(gameObj, userId);
          await dataSources.userService.joinGame(userId, res.id);
        } catch (err) {
          throw new ApolloError(err.message || err);
        }

        return res;
      }

      throw new AuthenticationError(`Unauthenticated user request`);
    },

    // async joinGame(parent: any, args: any, context: any): Promise<Game> {
    //   const { input } = args;
    //   const { gameId } = input;
    //   const userId = get(context, 'userData.data.username');
    //   let game;

    //   try {
    //     game = await dataSources.gameService.getGame(gameId);
    //   } catch (err) {
    //     throw new Error(err);
    //   }

    //   if (!userId) {
    //     console.log('Unauthenticated user request');
    //     throw new ValidationError(`Unauthenticated user request`);
    //   }
    //   if (!game) {
    //     console.log('GameID not found');
    //     throw new ValidationError(`GameID not found`);
    //   }

    //   const index = game.users.indexOf(userId);
    //   const userIdMatches = game.users[index] === userId;

    //   console.log('context', context);
    //   console.log('userId', userId);
    //   console.log('game.users', game.users);
    //   console.log('index', index);
    //   console.log('userIdMatches', userIdMatches);

    //   let gameUpdated = game;

    //   if (!userIdMatches) {
    //     try {
    //       await dataSources.userService.joinGame(userId, gameId);
    //       gameUpdated = await dataSources.gameService.joinGame(userId, gameId);
    //     } catch (err) {
    //       throw new Error(err);
    //     }
    //   }

    //   return gameUpdated;
    // },

    async startGame(parent: any, args: any, context: any) {
      const { input } = args;
      const { gameId } = input;
      const userId = context.userData && context.userData.data && context.userData.data.username;
      let game;

      if (!userId) {
        throw new ValidationError(`Unauthenticated user request`);
      }

      try {
        game = await dataSources.gameService.getGame(gameId);
      } catch (err) {
        throw new Error(err);
      }

      if (!game) {
        throw new ValidationError(`GameID not found`);
      }

      const index = game.users.indexOf(userId);
      const userIdMatches = game.users[index] === userId;

      if (userIdMatches) {
        let gameUpdated = game;

        if (!game.started) {
          gameUpdated = await dataSources.gameService.startGame(gameId);
          pubsub.publish(GAME_UPDATED, { gameUpdated });
        }

        return gameUpdated;
      }

      throw new ValidationError(`Unauthenticated user request`);
    },

    // endGame(parent: any, args: any, context: any) {
    //   const { input } = args;
    //   const { gameId } = input;
    //   const userId = context.userData && context.userData.data && context.userData.data.username;
    //   const game = dataSources.gameService.getGame(gameId);

    //   if (!userId) {
    //     throw new ValidationError(`Unauthenticated user request`);
    //   }
    //   if (!game) {
    //     throw new ValidationError(`GameID not found`);
    //   }

    //   const index = game.users.indexOf(userId);
    //   const userIdMatches = game.users[index] === userId;

    //   if (userIdMatches) {
    //     let gameUpdated;

    //     if (game.started && !game.finished) {
    //       dataSources.gameService.endGame(gameId);
    //       try {
    //         gameUpdated = dataSources.gameService.getGame(gameId);
    //         pubsub.publish(GAME_UPDATED, { gameUpdated });
    //         return gameUpdated;
    //       } catch (err) {
    //         throw new UserInputError(err);
    //       }
    //     }

    //     throw new UserInputError('Cannot end this game');
    //   }

    //   throw new ValidationError(`Unauthenticated user request`);
    // },

    async updateGame(parent: any, args: any, context: any) {
      const { input } = args;
      const {
        gameId = required('Game Id'),
        player = required('Player'),
        score = required('Score'),
      } = input;
      const userId = context.userData && context.userData.data && context.userData.data.username;
      const game = await dataSources.gameService.getGame(gameId);

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

      if (Number(score) <= 0 || Number(score) > 100) {
        throw new Error(
          `Invalid score: ${score}. A valid score must be a number between 0 and 100`
        );
      }

      const index = game.users.indexOf(userId);
      const userIdMatches = game.users[index] === userId;

      if (!userIdMatches) {
        throw new ValidationError(`Unauthenticated user request`);
      }

      const playerIndex = game.players.findIndex(currPlayer => currPlayer.color === player);

      if (!userIdMatches) {
        throw new Error(`Cannot find the selected user in the database`);
      }

      const newScore = game.players[playerIndex].score + score;

      pubsub.publish(GAME_UPDATING, { gameUpdating: { loading: true } });

      const gameUpdated = await dataSources.gameService.updateScore(gameId, newScore, playerIndex);
      await new Promise(res => setTimeout(() => res(), 250));

      pubsub.publish(GAME_UPDATING, { gameUpdating: { loading: false } });
      pubsub.publish(GAME_UPDATED, { gameUpdated });

      return gameUpdated;
    },
  },
};
