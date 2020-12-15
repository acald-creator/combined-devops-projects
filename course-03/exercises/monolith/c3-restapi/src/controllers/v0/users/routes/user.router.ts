/* eslint no-unused-vars: ["error", { "args": "none" }] */
import { Router, Request, Response } from 'express';

import User from '../models/Users';
import AuthRouter from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/', async (req: Request, res: Response) => { });

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await User.findByPk(id);
  res.send(item);
});

const UserRouter: Router = router;
export { UserRouter as default };
