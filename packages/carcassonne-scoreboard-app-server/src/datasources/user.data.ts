export interface IUser {
  id: string;
  games: string[];
}

export class User {
  public id: string;
  public games: string[];

  constructor(id: string) {
    this.id = id;
    this.games = [];
  }
}
