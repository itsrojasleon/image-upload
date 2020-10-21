import express, { Request, Response } from 'express';
import { NotFoundError } from '../../errors/not-found';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { Post } from '../../models/post';
import { User } from '../../models/user';

const router = express.Router();

router.get('/api/posts', async (req: Request, res: Response) => {
  const posts = await Post.find({}).populate('user');

  res.send(posts);
});

router.get(
  '/api/posts/me',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const posts = await Post.find({ user: req.user!.id }).populate('user');

    res.send(posts);
  }
);

export { router as indexPostsRouter };
