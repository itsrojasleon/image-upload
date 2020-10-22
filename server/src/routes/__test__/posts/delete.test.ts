import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../../app';
import { Post } from '../../../models/post';

describe('Delete Posts', () => {
  it('deletes correctly a post with authenticated user', async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .post('/api/posts')
      .set('Cookie', cookie)
      .send({
        title: 'title',
        description: 'description',
        imageUrl: 'image',
        user: mongoose.Types.ObjectId().toHexString()
      })
      .expect(201);

    const post = await Post.find({});

    expect(post).toHaveLength(1);

    await request(app)
      .delete(`/api/posts/${response.body.id}`)
      .set('Cookie', cookie)
      .send({})
      .expect(200);

    const posts = await Post.find({});

    expect(posts).toHaveLength(0);
  });
});
