import get from 'lodash/get';
import { dataSources } from '../../datasources';
import { IUser } from '../../datasources/user.service';
import { required } from '../../datasources/utils';
import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    async user(parent: any, args: any, context: any): Promise<IUser> {
      const { userId } = args;
      const currentUserId = get(context, 'userData.data.username');
      let userRes;

      try {
        userRes = await dataSources.userService.getUser(userId);
      } catch (err) {
        if (userId === currentUserId) {
          return dataSources.userService.createUser(currentUserId);
        }

        throw new Error(err);
      }

      return userRes;
    },

    async users(parent: any, args: any, context: any): Promise<number> {
      const user = get(context, 'userData.data.username');

      if (!user) {
        throw new AuthenticationError(`Unauthenticated user request`);
      }

      return dataSources.userService.getUsers();
    }
  },

  Mutation: {
    async updateUser(parent: any, args: any, context: any) {
      const { input } = args;
      const {
        userId = required('User Id'),
        nickname = required('Nickname'),
        picture = required('Picture'),
      } = input;
      const currentUserId = get(context, 'userData.data.username');

      if (userId !== currentUserId) {
        throw new AuthenticationError('Unauthenticated user request');
      }

      let userRes;

      try {
        userRes = await dataSources.userService.updateUser(userId, { nickname, picture });
      } catch (err) {
        throw new Error(err);
      }

      return userRes;
    },
  },
};
