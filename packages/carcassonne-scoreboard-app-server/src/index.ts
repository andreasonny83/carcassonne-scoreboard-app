import { server } from './server';
import { config } from './config';
import { app } from './app';

import fetch from 'node-fetch';
(global as any)['fetch'] = fetch;

const port: string = config.getPort();
const httpServer = server.init(app.appInstance, port);

app.getApolloServer().then((apolloServer) => {
  apolloServer.installSubscriptionHandlers(httpServer);
  server.start(apolloServer);
});
