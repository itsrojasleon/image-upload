import request from 'supertest';
import { app } from '../../../app';

describe('Current User', () => {
  it('responds with details about the current user', async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body.user.email).toEqual('test@test.com');
  });

  it('responds with null if the user is not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200);

    expect(response.body.user).toEqual(null);
  });
});
