export interface UserAttributes {
  nickname: string;
  picture: string;
}

export interface UserGame {
  gameId: string;
  finished: boolean;
  date: string;
}

export class User {
  public id: string;
  public nickname: string;
  public picture: string;
  public games: UserGame[];
  public victories: number;
  public defeats: number;

  constructor(userId: string) {
    this.id = userId;
    this.nickname = 'user';
    this.picture = userId;
    this.games = [];
    this.victories = 0;
    this.defeats = 0;
  }
}
