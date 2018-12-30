import * as express from 'express';
import uuid from 'uuid';
import { config } from '../config';

class MainController {
  public root(req: express.Request, res: express.Response) {
    return res.status(200).send({
      message: config.get('APP_NAME'),
    });
  }

  public async status(req: express.Request, res: express.Response) {
    return res.status(200).send({
      appName: config.get('APP_NAME'),
      debug: config.isDebug(),
      environmentName: config.getEnv(),
      status: 'ok',
      message: uuid.v4(),
    });
  }
}

export const mainController = new MainController();
