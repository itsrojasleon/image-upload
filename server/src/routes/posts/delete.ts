import express, { Request, Response } from 'express';
import { Post } from '../../models/post';

const router = express.Router();

router.delete('/api/posts/:postId', async (req: Request, res: Response) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.postId);

  res.send(deletedPost);
});

export { router as deletePostsRouter };
