export interface IUser {
  id: string;
  games: string[];
}

export class User {
  public id: string;
  public games: string[];

  constructor(userId: string) {
    this.id = userId;
    this.games = [];
  }
}
