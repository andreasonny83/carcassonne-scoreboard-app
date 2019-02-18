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

      const gameId: string = args.name;
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
    newGame(parent: any, args: any) {
      const game: any = dataSources.gameService.createGame();

      return dataSources.gameService.getGame(game.name);
    },

    game(parent: any, args: any) {
      const gameId: string = args.name;
      const game = dataSources.gameService.getGame(gameId);

      if (game) {
        return game;
      }

      // throw new ApolloError(`Game ${args.id} does not exist`);
      throw new ValidationError(`Game ID not found`);
    },
  },
};
