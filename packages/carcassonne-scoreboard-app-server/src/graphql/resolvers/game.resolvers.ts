import { ValidationError } from 'apollo-server';
import { dataSources } from '../../datasources';

export default {
  Query: {
    game(parent: any, args: any, context: any) {
      console.log('parent', parent);
      console.log('args', args);
      console.log('context', context);

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

  Mutation: {
    newGame(parent: any, args: any, context: any) {
      const userId =
        context && context.userData && context.userData.data && context.userData.data.username;

      if (userId) {
        const game: any = dataSources.gameService.createGame(userId);

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
        throw new ValidationError(`Unauthenticated user request`);
      }
      if (!game) {
        throw new ValidationError(`GameID not found`);
      }

      const index = game.players.indexOf(userId);
      const userIdMatches = game.players[index] === userId;

      if (~index && userIdMatches) {
        const gameUpdated = {
          ...game,
          players: [...game.players, userId],
        };

        dataSources.gameService.updateGame(gameUpdated);
        return dataSources.gameService.getGame(gameId);
      }

      throw new ValidationError(`Unauthenticated user request`);
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
