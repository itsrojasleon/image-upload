import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../../app';

describe('Index Posts', () => {
  it('Gets posts with details about the user', async () => {
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

    const response = await request(app)
      .get('/api/posts')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body[0].title).toEqual('title');
    expect(response.body[0].description).toEqual('description');
    expect(response.body[0].imageUrl).toEqual('image');
  });

  it('Retrieves my posts', async () => {
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

    const response = await request(app)
      .get('/api/posts')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body.length).toEqual(1);
  });
});
