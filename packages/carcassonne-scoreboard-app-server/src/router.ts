import * as express from 'express';
import { mainController, adminController } from './controllers';
import { check } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import { corsMiddleware } from './corsMiddleware';

class MainRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get('/', (req: express.Request, res: express.Response) =>
      mainController.root(req, res)
    );

    this.router.get('/status', (req: express.Request, res: express.Response) =>
      mainController.status(req, res)
    );

    this.router.post(
      '/register',
      [
        // sanitizeBody('usernams'),
        // sanitizeBody('password'),
        check('username').isEmail(),
        check('password').isLength({ min: 6 }),
      ],
      (req: express.Request, res: express.Response) => adminController.register(req, res)
    );

    this.router.post('/login', (req: express.Request, res: express.Response) =>
      adminController.login(req, res)
    );
  }
}

export const router = new MainRoutes().router;
