import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../../app';

describe('Create Posts', () => {
  it('returns an error if there is not authenticated user', async () => {
    await request(app).post('/api/posts').send({
      title: 'title',
      description: 'description',
      imageUrl: 'image',
      user: mongoose.Types.ObjectId().toHexString()
    });
  });

  it('returns an error if missing properties', async () => {
    const cookie = await global.signin();

    await request(app)
      .post('/api/posts')
      .set('Cookie', cookie)
      .send({
        title: '',
        description: '',
        imageUrl: 'image',
        user: mongoose.Types.ObjectId().toHexString()
      })
      .expect(400);
  });

  it('creates a post with valid credentials', async () => {
    const cookie = await global.signin();

    await request(app)
      .post('/api/posts')
      .set('Cookie', cookie)
      .send({
        title: 'title',
        description: 'description',
        imageUrl: 'image',
        user: mongoose.Types.ObjectId().toHexString()
      })
      .expect(201);
  });
});
