import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request';
import { User } from '../../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('Password must be between 5 and 30 characters'),
    body('username')
      .trim()
      .isLength({ min: 5, max: 25 })
      .withMessage(
        'username must be provided and be between 5 and 25 characters'
      )
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('The provided email is already in use');
    }

    const existingUserName = await User.findOne({ username });

    if (existingUserName) {
      throw new BadRequestError('The provided username is already in use');
    }

    const user = User.build({ email, password, username });

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
