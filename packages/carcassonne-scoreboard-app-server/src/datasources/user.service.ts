import { DataSource } from 'apollo-datasource';

import { User, IUser } from './user.data';

export class UserService extends DataSource {
  private users: Map<string, IUser>;

  constructor() {
    super();
    this.users = new Map();
  }

  public getUsers() {
    return this.users;
  }

  public getUser(userId: string) {
    if (!userId) {
      throw new Error('A user id should be specified.');
    }

    return this.users.get(userId);
  }

  public addUserGame(userId: string, gameId: string, retry?: boolean): IUser | undefined {
    const user = this.users.get(userId);

    if (!user && !retry) {
      this.users.set(userId, new User(userId));
      return this.addUserGame(userId, gameId, true);
    }
    if (!user) {
      throw new Error('Cannot create user.');
    }

    if (!!~user.games.indexOf(gameId)) {
      return this.users.get(userId);
    }

    const playerUpdated = {
      id: user.id,
      games: [...user.games, gameId],
    };

    this.users.set(userId, playerUpdated);
    return this.users.get(userId);
  }
}
