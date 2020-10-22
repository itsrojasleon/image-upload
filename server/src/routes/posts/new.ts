import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Post } from '../../models/post';

const router = express.Router();

router.post(
  '/api/posts',
  currentUser,
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('You must provide a title'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('You must provide a description'),
    body('imageUrl').not().isEmpty().withMessage('You must provide an image'),
    body('user').not().isEmpty().withMessage('You must provide a user id')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description, imageUrl } = req.body;

    const post = Post.build({
      title,
      description,
      imageUrl,
      user: req.user!.id
    });

    await post.save();

    res.status(201).send(post);
  }
);

export { router as createPostsRouter };
