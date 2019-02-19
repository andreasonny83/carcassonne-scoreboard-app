import { DataSource } from 'apollo-datasource';
import { uniqueNamesGenerator } from 'unique-names-generator';

import { Game, IGame } from './game.data';

export class GameService extends DataSource {
  private games: Map<string, IGame>;

  constructor() {
    super();
    this.games = new Map();
  }

  public initialize() {
    //
    console.log('...initialize...');
  }

  public createGame(userId: string) {
    const gameId: string = newId();
    const game: IGame = {
      id: gameId,
      name: gameId,
      players: [
        userId
      ],
    };

    this.games.set(gameId, new Game(game));
    return this.games.get(gameId);
  }

  public updateGame(gameUpdated: IGame): IGame | undefined {
    const { id } = gameUpdated;
    this.games.set(id, gameUpdated);

    return this.games.get(id);
  }

  public getGame(gameId: string) {
    if (!gameId) {
      throw new Error('A game id should be specified.');
    }

    return this.games.get(gameId);
  }

  public startGame(gameId: string) {
    if (!gameId) {
      throw new Error('A game id should be specified.');
    }

    const game = this.games.get(gameId);

    if (game && game.started) {
      throw new Error(`Game ${game && game.id} already started.`);
    }

    if (game && game.id && game.name) {
      const gameUpdated = {
        ...game,
        started: true,
      };

      return this.games.set(gameId, gameUpdated);
    }

    throw new Error('Invalid game');
  }

  public getGames() {
    return this.games;
  }
}

// ----- Helper Functions -----

function newId(): string {
  return uniqueNamesGenerator('_');
}
