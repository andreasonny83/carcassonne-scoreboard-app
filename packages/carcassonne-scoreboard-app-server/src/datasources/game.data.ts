export interface IGame {
  name: string;
  id: string;
  started?: boolean;
  finished?: boolean;
  players: string[];
  log?: any[];
}

export class Game {
  public name: string;
  public id: string;
  public started: boolean;
  public finished: boolean;
  public players: any[];
  public log: any[];

  constructor({ id, name, started, finished, players, log }: IGame) {
    this.id = id;
    this.name = name;
    this.started = started || false;
    this.finished = finished || false;
    this.players = players;
    this.log = log || [];
  }
}