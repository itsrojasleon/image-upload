import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  async (req: Request, res: Response) => {
    res.send({ user: req.user || null });
  }
);

export { router as currentUserRouter };
