import { mergeTypes } from 'merge-graphql-schemas';
import gameType from './typedefs/game';
import logType from './typedefs/log';
import playerType from './typedefs/player';
import usersType from './typedefs/users';

const types = [gameType, logType, playerType, usersType];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export const typeDefs = mergeTypes(types, { all: true });
