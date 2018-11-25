import http from 'http';
import { app } from './app';

class Server {
  private portNumber: number = 8888;
  private serverInstance?: http.Server;

  public setPort(portNumber: number) {
    this.portNumber = portNumber;
    return this;
  }

  public start() {
    if (this.serverInstance) {
      return console.error(`The server is already running on port ${this.portNumber}`);
    }

    this.serverInstance = app.listen(this.portNumber, () => {
      const addressInfo: any = this.serverInstance!.address();
      const address: string =
        'address' in addressInfo
          ? addressInfo.address === '::'
            ? 'http://localhost:'
            : addressInfo.address
          : '';
      const port: number = 'port' in addressInfo ? addressInfo.port : null;

      console.log(`Server listening on ${address}${port}`);
    });
  }
}

export const server: Server = new Server();
