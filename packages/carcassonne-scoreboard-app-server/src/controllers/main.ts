import * as express from 'express';
import uuid from 'uuid';
import { APP_NAME } from '../appConfig';

class MainController {
  public root(req: express.Request, res: express.Response) {
    return res.status(200).send({
      message: APP_NAME,
    });
  }

  public status(req: express.Request, res: express.Response) {
    return res.status(200).send({
      appName: APP_NAME,
      status: 'ok',
      message: uuid.v4(),
    });
  }
}

export const mainController = new MainController();
