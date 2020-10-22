import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { Post } from '../../models/post';

const router = express.Router();

router.delete(
  '/api/posts/:postId',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const deletedPost = await Post.deleteOne({ _id: req.params.postId });

    res.send(deletedPost);
  }
);

export { router as deletePostsRouter };
