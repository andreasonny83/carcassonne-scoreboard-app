import { DataSource } from 'apollo-datasource';

import { User, IUser } from './user.data';

export class UserService extends DataSource {
  private users: Map<string, IUser>;

  constructor() {
    super();
    this.users = new Map();
  }

  public initialize() {
    console.log('...initialize...');
  }

  public createUser(userId: string) {
    this.users.set(userId, new User(userId));
    return this.users.get(userId);
  }

  public getUser(userId: string) {
    if (!userId) {
      throw new Error('A user id should be specified.');
    }

    if (!this.users.get(userId)) {
      this.createUser(userId);
    }

    return this.users.get(userId);
  }

  public getUsers() {
    return this.users;
  }
}
