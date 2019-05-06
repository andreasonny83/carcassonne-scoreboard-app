import * as express from 'express';
import { mainController, adminController } from './controllers';
import { check, validationResult } from 'express-validator/check';

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
      '/sign-up',
      [check('username').isEmail(), check('password').isLength({ min: 8 })],
      async (req: express.Request, res: express.Response) => {
        const { username, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.sendStatus(403);
        }

        const status: number = await adminController.register(username, password);
        res.sendStatus(status);
      }
    );

    this.router.post(
      '/confirm-code',
      [
        check('username').isEmail(),
        check('code')
          .isNumeric()
          .isLength({ min: 6, max: 6 }),
      ],
      async (req: express.Request, res: express.Response) => {
        const { username, code } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.sendStatus(403);
        }

        const status: number = await adminController.confirmCode(username, code);
        res.sendStatus(status);
      }
    );

    this.router.post(
      '/new-confirm-code',
      [check('username').isEmail()],
      async (req: express.Request, res: express.Response) => {
        const { username } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.sendStatus(403);
        }

        const status: number = await adminController.newConfirmCode(username);
        res.sendStatus(status);
      }
    );

    this.router.post('/verify-user', async (req: express.Request, res: express.Response) => {
      const { token } = req.body;

      try {
        await adminController.ValidateToken(token);
      } catch (err) {
        console.log(err);
        return res.sendStatus(401);
      }

      return res.sendStatus(200);
    });
  }
}

export const router = new MainRoutes().router;
