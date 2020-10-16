import request from 'supertest';
import { app } from '../../../app';

describe('Update', () => {
  it('returns a 401 status code if the user is not authenticated', async () => {
    await request(app)
      .put('/api/users')
      .send({
        email: 'test@test.com',
        password: 'password',
        username: 'rojasleon'
      })
      .expect(401);
  });

  it('returns a 400 status code if some of the credentials are invalid', async () => {
    const cookie = await global.signin();

    await request(app)
      .put('/api/users')
      .set('Cookie', cookie)
      .send({
        email: 'test',
        password: 'password',
        username: 's'
      })
      .expect(400);
  });

  it('returns details if the user is authenticated and the given credentials are valid', async () => {
    const cookie = await global.signin();

    await request(app)
      .put('/api/users')
      .set('Cookie', cookie)
      .send({
        email: 'test@test.com',
        password: 'password',
        username: 'thedude'
      })
      .expect(200);
  });
});
