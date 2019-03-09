import { mergeResolvers } from 'merge-graphql-schemas';
import gameResolvers from './resolvers/game.resolvers';
import usersResolvers from './resolvers/users.resolvers';

const resolversArray = [gameResolvers, usersResolvers];

export const resolvers = mergeResolvers(resolversArray);
