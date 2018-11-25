import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { CORSRules } from 'aws-sdk/clients/s3';
import { router } from './router';
import morgan from 'morgan';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
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
  }
}

export const app = new App().app;
