import { ValidationError } from 'apollo-server';
import { dataSources } from '../../datasources';

export default {
  Query: {
    user(parent: any, args: any, context: any) {
      const user = context && context.userData && context.userData.data;
      const userId = user && user.username;

      return dataSources.userService.getUser(userId);
    },

    users() {
      return dataSources.userService.getUsers();
    },
  },
};
