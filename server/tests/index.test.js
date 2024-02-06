
const supertest = require('supertest');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('../dist/routers/router').default


const { describe, it, test, expect, beforeEach, beforeAll, afterAll } = require('@jest/globals')
const { clearDatabase } = require('./helpers.js')
const { prisma } = require('../src/db')

describe('user profile', () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());
  const request = supertest.agent(app.callback())


  beforeAll(async () => {
    // await clearDatabase();
  })

  it('registers a new user', async () => {
    const res = await request.get('/myprofile').expect(200);
    console.log(res)
  })

})