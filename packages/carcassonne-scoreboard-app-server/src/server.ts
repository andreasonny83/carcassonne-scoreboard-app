import http from 'http';
import { Application } from 'express';
import { app } from './app';

class Server {
  private expressApp: Application;
  private portNumber: number = 8888;
  private serverInstance?: http.Server;

  constructor(expressApp: Application) {
    this.expressApp = expressApp;
  }

  public setPort(portNumber: number) {
    this.portNumber = portNumber;
    return this;
  }

  public start() {
    if (this.serverInstance) {
      return console.error(`The server is already running on port ${this.portNumber}`);
    }

    this.serverInstance = this.expressApp.listen(this.portNumber, () => {
      const addressInfo: any = this.serverInstance!.address();
      const address: string =
        'address' in addressInfo
          ? addressInfo.address === '::'
            ? 'http://localhost:'
            : addressInfo.address
          : '';
      const port: number = 'port' in addressInfo ? addressInfo.port : null;

      console.log(`Server listening on ${address}${port}`);
      console.log(`GraphQL playground listening on ${address}${port}/graph`);
    });
  }
}

export const server: Server = new Server(app);
