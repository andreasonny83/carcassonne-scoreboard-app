import express, { Application, Request } from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import morgan from 'morgan';
import cors from 'cors';
import { typeDefs, resolvers } from './schema';
import { router } from './router';
import { adminController } from './controllers/admin';
import { config } from './config';
import * as bodyParser from 'body-parser';

class App {
  public app: express.Application;
  private admin: typeof adminController;

  constructor() {
    this.app = express();
    this.admin = adminController;
    this.config();
  }

  private config(): void {
    this.app.use(morgan('dev'));
    this.app.disable('x-powered-by');
    this.app.use(cors());

    // Support application/json type post data
    this.app.use(bodyParser.json());

    // Support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use('/', router);

    this.applyMiddlewares(this.app);
  }

  private applyMiddlewares(expressApp: Application) {
    const apolloServer: ApolloServer = new ApolloServer({
      context: async ({ req }: { req: Request }) => {
        const authorization: string = String(req.headers.authorization) || '';
        const token: string = authorization.replace('Bearer ', '');
        let userData;

        try {
          userData = await this.admin.ValidateToken(token);
        } catch (err) {
          throw new AuthenticationError('you must be logged in');
        }

        console.log('userData', userData);

        return { userData };
      },
      typeDefs,
      resolvers,
      playground: config.isDev(),
    });

    apolloServer.applyMiddleware({
      app: expressApp,
      path: '/graph',
      // cors: {
      //   origin: 'http://localhost:3000',
      // },
    });
  }
}

export const app = new App().app;
