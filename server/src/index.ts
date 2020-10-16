import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';
import { DatabaseConnectionError } from './errors/database-connection';

dotenv.config({ path: __dirname + '/.env' });

const main = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect(
      'mongodb://test:password1@ds063240.mlab.com:63240/image-upload-dev',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('Connected to mongo db');
  } catch (error) {
    throw new DatabaseConnectionError();
  }

  app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`);
  });
};

main();
