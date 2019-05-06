import { GameService } from './game.service';
import { UserService } from './user.service';

// TODO: We will not pass dataSources via context because this does not work with subscriptions
// See https://github.com/apollographql/apollo-server/issues/1526

const gameService = new GameService();
const userService = new UserService();

export const dataSources = {
  gameService: gameService,
  userService: userService,
};
