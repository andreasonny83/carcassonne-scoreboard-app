import * as express from 'express';
import uuid from 'uuid';
import { config, IConfig } from '../config';

class MainController {
  private config: IConfig;

  constructor(configInstance: IConfig) {
    this.config = configInstance;
  }

  public root(req: express.Request, res: express.Response) {
    return res.status(200).send({
      message: this.config.get('APP_NAME'),
    });
  }

  public async status(req: express.Request, res: express.Response) {
    return res.status(200).send({
      appName: this.config.get('APP_NAME'),
      debug: this.config.isDebug(),
      environmentName: this.config.getEnv(),
      status: 'ok',
      message: uuid.v4(),
    });
  }
}

export const mainController = new MainController(config);
