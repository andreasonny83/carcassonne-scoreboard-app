import http from 'http';
import { Application } from 'express';

class Server {
  private serverInstance?: http.Server;

  public start(expressApp: Application, portNumber: string) {
    if (this.serverInstance) {
      console.error(`The server is already running on port ${portNumber}`);
      return this.serverInstance;
    }

    this.serverInstance = expressApp.listen(portNumber, () => {
      const addressInfo: any = this.serverInstance!.address();
      const port: number = 'port' in addressInfo ? addressInfo.port : null;
      const address: string =
        'address' in addressInfo
          ? addressInfo.address === '::'
            ? 'http://localhost:'
            : addressInfo.address
          : '';

      console.log(`🚀  Server listening on ${address}${port}`);
      console.log(`🚀  Subscriptions listening on ${address}${port}/graphql`);
      console.log(`GraphQL playground listening on ${address}${port}/graph`);
    });
  }
}

export const server: Server = new Server();
