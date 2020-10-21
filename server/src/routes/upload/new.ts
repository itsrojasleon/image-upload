import express, { Request, Response } from 'express';
import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  apiVersion: '2006-03-01',
  region: 'us-east-2'
});

router.get(
  '/api/upload',
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    const key = `${req.user!.id}/${v4()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'upload-123',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => res.send({ key, url })
    );
  }
);

export { router as uploadRouter };
