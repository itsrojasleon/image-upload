import request from 'supertest';
import { app } from '../../../app';

describe('Signup', () => {
  it('returns a 201 with valid credentials', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        username: 'rojasleon'
      })
      .expect(201);
  });

  it('returns a 400 with invalid credentials', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test',
        password: 'pas',
        username: 'rojasleon'
      })
      .expect(400);
  });

  it('returns a cookie after a successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        username: 'rojasleon'
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });

  it('returns a 400 status code if the email or username is already in use', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        username: 'rojasleon'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        username: 'ohterusername'
      })
      .expect(400);

    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test1@test.com',
        password: 'password',
        username: 'rojasleon'
      })
      .expect(400);
  });
});
