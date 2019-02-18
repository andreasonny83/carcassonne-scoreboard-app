import { DataSource } from 'apollo-datasource';
import { uniqueNamesGenerator } from 'unique-names-generator';

import { Game, GameInput } from './game.data';

export class GameService extends DataSource {
  private games: Map<string, {}>;

  constructor() {
    super();
    this.games = new Map();
  }

  public initialize() {
    //
    console.log('...initialize...');
  }

  public createGame() {
    const gameId: string = newId();
    const game = {
      id: gameId,
      name: gameId,
    };

    this.games.set(gameId, new Game(game));
    return this.games.get(gameId);
  }

  public getGame(gameId: string) {
    if (!gameId) {
      throw new Error('A game id should be specified.');
    }

    return this.games.get(gameId);
  }

  public getGames() {
    console.log(this.games);
    return this.games;
  }
}

// ----- Helper Functions -----

function newId(): string {
  return uniqueNamesGenerator('_')
}
