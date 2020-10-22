import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found';

import { currentUserRouter } from './routes/users/current-user';
import { signupRouter } from './routes/users/signup';
import { signinRouter } from './routes/users/signin';
import { signoutRouter } from './routes/users/signout';
import { updateUserRouter } from './routes/users/update';
import { showUserRouter } from './routes/users/show';

import { createPostsRouter } from './routes/posts/new';

import { uploadRouter } from './routes/upload/new';
import { indexPostsRouter } from './routes/posts/index';
import { deletePostsRouter } from './routes/posts/delete';

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://yourapp.com'];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);
app.use(json());

app.use(cookieSession({ signed: false, secure: false }));

app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(updateUserRouter);
app.use(showUserRouter);

app.use(createPostsRouter);
app.use(indexPostsRouter);
app.use(deletePostsRouter);

app.use(uploadRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
