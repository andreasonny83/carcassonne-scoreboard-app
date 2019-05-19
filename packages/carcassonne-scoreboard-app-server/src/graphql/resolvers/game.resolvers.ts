import get from 'lodash/get';
import {
  ValidationError,
  UserInputError,
  PubSub,
  ApolloError,
  AuthenticationError,
  withFilter,
} from 'apollo-server';
import { dataSources } from '../../datasources';
import { MeepleColor, PlayerInput, Game, IPlayer } from '../../datasources/game.data';
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
  },

  Subscription: {
    gameUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(GAME_UPDATED),
        (payload, args) => {
          const gameId = get(args, 'gameId');
          const gameUpdatedId = get(payload, 'gameUpdated.id');

          return Boolean(gameId === gameUpdatedId);
        }
      ),
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

      sanitizedPlayers[0].userId = userData.id;
      sanitizedPlayers[0].picture = userData.picture;

      const gameObj: NewGameInput = {
        gameName: sanitizedGameName,
        players: sanitizedPlayers,
      };

      if (userData.id) {
        let res;

        try {
          res = await dataSources.gameService.createGame(gameObj, userData.id);
          await dataSources.userService.joinGame(userData.id, res);
        } catch (err) {
          throw new ApolloError(err.message || err);
        }

        return res;
      }

      throw new AuthenticationError(`Unauthenticated user request`);
    },

    async joinGame(parent: any, args: any, context: any): Promise<Game> {
      const { input } = args;
      const { gameId } = input;
      const userId = get(context, 'userData.data.username');

      try {
        await dataSources.userService.getUser(userId);
      } catch (err) {
        throw new AuthenticationError(`Unauthenticated user request`);
      }

      let game;

      try {
        game = await dataSources.gameService.getGame(gameId);
      } catch (err) {
        throw new ValidationError(`Game not found`);
      }

      let gameUpdated;

      try {
        gameUpdated = await dataSources.gameService.joinGame(userId, gameId);
        await dataSources.userService.joinGame(userId, game);
        pubsub.publish(GAME_UPDATED, { gameUpdated });
      } catch (err) {
        throw new Error(err);
      }

      return gameUpdated;
    },

    async startGame(parent: any, args: any, context: any) {
      const { input } = args;
      const { gameId } = input;
      const userId = get(context, 'userData.data.username');
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

    async endGame(parent: any, args: any, context: any) {
      const { input } = args;
      const { gameId } = input;
      const userId = get(context, 'userData.data.username');
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
        throw new ValidationError(`Game not found`);
      }

      const index = game.users.indexOf(userId);
      const userIdMatches = game.users[index] === userId;

      if (userIdMatches) {
        let gameUpdated = game;

        if (game.started && !game.finished) {
          gameUpdated = await dataSources.gameService.endGame(game);
          await dataSources.userService.endGame(game);

          pubsub.publish(GAME_UPDATED, { gameUpdated });
        }

        return gameUpdated;
      }

      throw new ValidationError(`Unauthenticated user request`);
    },

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

      const gameUpdated = await dataSources.gameService.updateScore(gameId, newScore, playerIndex);
      gameUpdated.log.sort().reverse();

      pubsub.publish(GAME_UPDATED, { gameUpdated });

      return gameUpdated;
    },

    async undoLastMove(parent: any, args: any, context: any) {
      const { input } = args;
      const { gameId = required('Game Id') } = input;
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

      const index = game.users.indexOf(userId);
      const userIdMatches = game.users[index] === userId;

      if (!userIdMatches) {
        throw new ValidationError(`Unauthenticated user request`);
      }

      const gameUpdated = await dataSources.gameService.undoMove(gameId);
      gameUpdated.log.sort().reverse();

      pubsub.publish(GAME_UPDATED, { gameUpdated });

      return gameUpdated;
    },

    async redeemPlayer(parent: any, args: any, context: any) {
      const { input } = args;
      const { gameId = required('Game Id'), player = required('Player') } = input;
      const userId = get(context, 'userData.data.username');
      const game = await dataSources.gameService.getGame(gameId);

      let userData;

      try {
        userData = await dataSources.userService.getUser(userId);
      } catch (err) {
        throw new AuthenticationError(`Unauthenticated user request`);
      }

      if (!userData) {
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

      const index = game.users.indexOf(userData.id);
      const userIdMatches = game.users[index] === userData.id;

      if (!userIdMatches) {
        throw new ValidationError(`Unauthenticated user request`);
      }

      const playerIndex = game.players.findIndex(currPlayer => currPlayer.color === player);

      if (!userIdMatches) {
        throw new Error(`Cannot find the selected user in the database`);
      }
      if (game.players[playerIndex].userId) {
        throw new Error(`Player already assigned to another user`);
      }

      const newPlayer: IPlayer = (game.players[playerIndex] = {
        ...game.players[playerIndex],
        userId: userData.id,
        picture: userData.picture,
      });

      const gameUpdated = await dataSources.gameService.updatePlayer(
        gameId,
        newPlayer,
        playerIndex
      );

      pubsub.publish(GAME_UPDATED, { gameUpdated });

      return gameUpdated;
    },
  },
};
