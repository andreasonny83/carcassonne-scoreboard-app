import { ValidationError } from 'apollo-server';
import { dataSources } from '../../datasources';

export default {
  Query: {
    game(parent: any, args: any, context: any) {
      const { gameId } = args;
      const { userData } = context;
      const userId = userData && userData.data && userData.data.username;
      const game = dataSources.gameService.getGame(gameId);

      if (!userId) {
        throw new ValidationError(`Unauthenticated user request`);
      }
      if (!game) {
        throw new ValidationError(`Game ID not found`);
      }

      const index = game.players.indexOf(userId);
      const userIdMatches = game.players[index] === userId;

      if (!!~index && userIdMatches) {
        return game;
      }

      throw new ValidationError(`Cannot access this game. Make sure you are the creator.`);
    },

    games() {
      return dataSources.gameService.getGames();
    },
  },

  Mutation: {
    newGame(parent: any, args: any, context: any) {
      const { userData } = context;
      const userId = userData && userData.data && userData.data.username;

      if (userId) {
        const game: any = dataSources.gameService.createGame(userId);

        dataSources.userService.addUserGame(userId, game.id);
        return dataSources.gameService.getGame(game.id);
      }

      throw new ValidationError(`Unauthenticated user request`);
    },

    joinGame(parent: any, args: any, context: any) {
      const { gameId } = args;
      const { userData } = context;
      const userId = userData && userData.data && userData.data.username;
      const game = dataSources.gameService.getGame(gameId);

      if (!userId) {
        throw new ValidationError(`Unauthenticated user request`);
      }
      if (!game) {
        throw new ValidationError(`GameID not found`);
      }

      const isStarted = dataSources.gameService.isStarted(gameId);

      if (!isStarted) {
        const index = game.players.indexOf(userId);
        const userIdMatches = game.players[index] === userId;

        if (!!~index && userIdMatches) {
          return dataSources.gameService.getGame(gameId);
        }

        throw new ValidationError(`Game not yet started`);
      }

      const gameUpdated = {
        ...game,
        players: [...game.players, userId],
      };

      dataSources.gameService.updateGame(gameUpdated);
      dataSources.userService.addUserGame(userId, gameId);

      return dataSources.gameService.getGame(gameId);
    },

    startGame(parent: any, args: any, context: any) {
      const { gameId } = args;
      const { userData } = context;
      const userId = userData && userData.data && userData.data.username;
      const game = dataSources.gameService.getGame(gameId);

      if (!userId) {
        throw new ValidationError(`Unauthenticated user request`);
      }
      if (!game) {
        throw new ValidationError(`GameID not found`);
      }

      const index = game.players.indexOf(userId);
      const userIdMatches = game.players[index] === userId;

      if (!!~index && userIdMatches) {
        dataSources.gameService.startGame(gameId);
        return dataSources.gameService.getGame(gameId);
      }

      throw new ValidationError(`Unauthenticated user request`);
    },
  },
};
