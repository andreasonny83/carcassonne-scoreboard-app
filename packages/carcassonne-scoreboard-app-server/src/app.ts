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
  public app: Application;
  private admin: typeof adminController;
  private appConfig: IConfig;

  constructor(appConfig: IConfig) {
    this.app = express();
    this.admin = adminController;
    this.appConfig = appConfig;
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

export const app = new App(config).app;
