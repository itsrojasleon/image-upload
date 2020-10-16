import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import { BadRequestError } from '../../errors/bad-request';
import { User } from '../../models/user';

const router = express.Router();

router.put(
  '/api/users',
  currentUser,
  requireAuth,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('You must supply a password'),
    body('username')
      .trim()
      .isLength({ min: 5, max: 25 })
      .withMessage('Username must be between 5 and 25 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const user = await User.findById(req.user!.id);

    if (!user) {
      throw new BadRequestError('User not found');
    }

    user.set({ email, password, username });

    await user.save();

    res.send(user);
  }
);

export { router as updateUserRouter };
