import uuid = require('uuid');
import { uniqueNamesGenerator } from 'unique-names-generator';

export type MeepleColor = 'green' | 'red' | 'blue' | 'yellow' | 'black' | 'gray';

export interface PlayerInput {
  name: string;
  color: MeepleColor;
  userId?: string;
  picture?: string;
}

export type IPlayer = {
  name: string;
  color: MeepleColor;
  id: string;
  score: number;
  userId?: string;
  picture?: string;
};

class Player {
  public name: string;
  public color: MeepleColor;
  public id: string;
  public score: number;
  public userId?: string;
  public picture?: string;

  constructor(name: string, color: MeepleColor, userId?: string, picture?: string) {
    this.name = name;
    this.color = color;
    this.id = uuid.v1();
    this.score = 0;

    if (userId) {
      this.userId = userId;
    }
    if (picture) {
      this.picture = picture;
    }
  }
}

export class Game {
  public id: string;
  public name: string;
  public started: boolean;
  public finished: boolean;
  public date: string;
  public players: IPlayer[];
  public users: string[];
  public log: any[];

  constructor(name: string, players: PlayerInput[], users: string[]) {
    this.id = uniqueNamesGenerator('_');
    this.date = new Date().toDateString();
    this.name = name;
    this.users = users;
    this.started = false;
    this.finished = false;
    this.log = [];
    this.players = players.map(player => new Player(player.name, player.color, player.userId, player.picture));
  }
}
