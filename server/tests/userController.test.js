
const supertest = require('supertest');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('../dist/routers/router').default

const { describe, it, test, expect, beforeEach, beforeAll, afterAll } = require('@jest/globals')
const { deleteAll, registerUser } = require('./helpers.js');
const { register } = require('module');
const prisma = require('../src/db').default

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());
const request = supertest.agent(app.callback())


describe('register a new profile', () => {

  beforeAll(async () => {
    await deleteAll()
  })
  afterAll(async () => {
    await deleteAll()
  })

  it('successfully registers a new user', async () => {

    const res = await registerUser()

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('accessToken')
    expect(res.body).toHaveProperty('firstName');
    expect(res.body).toHaveProperty('lastName');
    expect(res.body).toHaveProperty('email');
  });

  it('fails to register with an existing email', async () => {
    const existingUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    };
    const res = await request.post('/signup').send(existingUser)
    expect(res.status).toBe(409)
  });

  it('fails to register with invalid data', async () => {
    const invalidUser = {
      firstName: 'Bob',
      email: 'invalid-email',
      password: 'pwd'
    };
    const res = await request.post('/signup').send(invalidUser)
    expect(res.status).toBe(500)
  });
})

describe('login functionality', () => {

  beforeAll(async () => {
    await deleteAll()
  })
  afterAll(async () => {
    await deleteAll()
  })

  it('successfully logs in with correct credentials', async () => {

    await registerUser()

    const userCredentials = {
      email: 'johndoe@example.com',
      password: 'password123'
    };
    const res = await request.post('/login').send(userCredentials);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('firstName');
    expect(res.body).toHaveProperty('lastName');
    expect(res.body).toHaveProperty('email');
    demoAccessToken = res.body.accessToken
  });

  it('fails to log in with incorrect credentials', async () => {
    const wrongCredentials = {
      email: 'johndoe@example.com',
      password: 'wrongpassword'
    };
    const res = await request.post('/login').send(wrongCredentials);

    expect(res.status).toBe(401);
  });
});

describe('myProfile functionality', () => {

  beforeAll(async () => {
    await deleteAll()
  })
  afterAll(async () => {
    await deleteAll()
  })

  it('successfully retrieves user profile with valid token', async () => {

    const registerResponse = await registerUser()

    const res = await request.get('/myprofile')
      .set('Authorization', registerResponse.body.accessToken);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('firstName');
    expect(res.body).toHaveProperty('lastName');
    expect(res.body).toHaveProperty('email');
  });

  it('fails to retrieve user profile with invalid token', async () => {
    const res = await request.get('/myprofile')
      .set('Authorization', 'nvalidtokenhere');

    expect(res.status).toBe(401);
  });
});



