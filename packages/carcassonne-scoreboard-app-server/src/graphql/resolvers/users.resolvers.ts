import { ValidationError } from 'apollo-server';
import { dataSources } from '../../datasources';

export default {
  Query: {
    user(parent: any, args: any, context: any) {
      const { userData } = context;
      const userId = userData && userData.data && userData.data.username;

      return dataSources.userService.getUser(userId);
    },

    users(parent: any, args: any, context: any) {
      return dataSources.userService.getUsers();
    }
  },
};
