import express, { Request, Response } from 'express';
import { User } from '../../models/user';

const router = express.Router();

router.get('/api/users/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).populate('post');

  res.send(user);
});

export { router as showUserRouter };
