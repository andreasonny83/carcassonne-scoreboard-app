import express, { Application, Request } from 'express';
import { ApolloServer, AuthenticationError, gql } from 'apollo-server-express';
import morgan from 'morgan';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { adminController } from './controllers/admin';
import { config, IConfig } from './config';
import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';
import { router } from './router';

class App {
  public appInstance: Application;
  private admin: typeof adminController;
  private appConfig: IConfig;

  constructor(appConfig: IConfig) {
    this.appInstance = express();
    this.admin = adminController;
    this.appConfig = appConfig;
  }

  public getApolloServer(): Promise<ApolloServer> {
    return this.config();
  }

  private async config(): Promise<ApolloServer> {
    this.appInstance.use(morgan('dev'));
    this.appInstance.disable('x-powered-by');
    this.appInstance.use(cors());

    // Support application/json type post data
    this.appInstance.use(bodyParser.json());

    // Support application/x-www-form-urlencoded post data
    this.appInstance.use(bodyParser.urlencoded({ extended: false }));

    this.appInstance.use('/', router);

    return this.applyMiddlewares(this.appInstance);
  }

  private async applyMiddlewares(expressApp: Application): Promise<ApolloServer> {
    const apolloServer: ApolloServer = await new ApolloServer({
      context: async ({ req }: { req: Request }) => {
        if (!req) {
          return;
        }

        // Allow GraphQL playground in development mode
        const originUrl: string = `localhost:${this.appConfig.getPort()}${req.baseUrl}`;
        const reg: RegExp = new RegExp(`${originUrl}$`, 'gi');
        const isPlayground: boolean = reg.test(String(req.headers.referer));

        if (this.appConfig.isDev() && isPlayground) {
          return {
            userData: {
              data: {
                username: 'dea9adba-4ef3-4687-ac7b-59a53ffafc5b',
              },
            },
          };
        }

        const authorization: string = String(req.headers.authorization) || '';
        const token: string = authorization.replace('Bearer ', '');
        let userData;

        try {
          userData = await this.admin.ValidateToken(token);
        } catch (err) {
          console.log('Error:', err.message);
          throw new AuthenticationError('you must be logged in');
        }

        // console.log('userData', userData);

        return { userData };
      },
      typeDefs: gql`
        ${typeDefs}
      `,
      resolvers,
      playground: this.appConfig.isDev(),
      subscriptions: {
        onConnect: () => console.log('Connected to websocket'),
      },
      tracing: true,
    });

    await apolloServer.applyMiddleware({
      app: expressApp,
      path: '/graphql',
      // cors: {
      //   origin: 'http://localhost:3000',
      // },
    });

    return apolloServer;
  }
}

export const app = new App(config);
