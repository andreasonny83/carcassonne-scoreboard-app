import { server } from './server';
import { config } from './config';
import { app } from './app';

const port: string = config.getPort();
const httpServer = server.init(app.appInstance, port);

app.getApolloServer().then((apolloServer) => {
  apolloServer.installSubscriptionHandlers(httpServer);
  server.start(apolloServer);
});
