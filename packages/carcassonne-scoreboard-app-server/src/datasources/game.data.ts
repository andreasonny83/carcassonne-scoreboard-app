export type MeepleColor = 'green' | 'red' | 'blue' | 'yellow' | 'black' | 'gray';

export interface IPlayer {
  name: string;
  key: string;
  color: MeepleColor;
  score?: number;
}

export interface IGame {
  name: string;
  id: string;
  started?: boolean;
  finished?: boolean;
  players: IPlayer[];
  users: string[];
  log?: any[];
}

export class Game {
  public name: string;
  public id: string;
  public started: boolean;
  public finished: boolean;
  public players: IPlayer[];
  public users: string[];
  public log: any[];

  constructor({ id, name, started, finished, players, users, log }: IGame) {
    this.id = id;
    this.name = name;
    this.started = started || false;
    this.finished = finished || false;
    this.players = players;
    this.users = users || [];
    this.log = log || [];
  }
}
