
const supertest = require('supertest');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('../dist/routers/router').default

const { describe, it, test, expect, beforeEach, beforeAll, afterAll } = require('@jest/globals')
const { deleteAll, addReview, registerUser } = require('./helpers.js')
const prisma = require('../src/db').default

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());
const request = supertest.agent(app.callback())


const testPropertyId = 'test_id;'
const testFullAddress = '21 test road'


describe('checkAddress functionality', () => {

  beforeAll(async () => {
    await deleteAll()
  });
  afterAll(async () => {
    await deleteAll()
  });

  it('successfully creates a new property when it does not exist', async () => {
    const newProperty = {
      property_id: testPropertyId,
      fullAddress: testFullAddress
    };
    const res = await request.post('/checkAddress').send(newProperty);

    expect(res.status).toBe(202);
    expect(res.body).toHaveProperty('property_id', newProperty.property_id);
  });
  it('successfully retrieves an existing property without reviews', async () => {

    const res = await request.post('/checkAddress').send({
      property_id: testPropertyId,
      fullAddress: testFullAddress
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('num_of_reviews');
    expect(res.body.num_of_reviews).toBe(0);
  });

  it('successfully retrieves an existing property with reviews', async () => {
    const registerResponse = await registerUser()
    const demoAccessToken = registerResponse.body.accessToken
    await addReview(testPropertyId, demoAccessToken)

    const res = await request.post('/checkAddress').send({
      property_id: testPropertyId,
      fullAddress: testFullAddress
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('num_of_reviews');
    expect(res.body.num_of_reviews).toBeGreaterThan(0);
  });



  it('fails when property_id is not provided in the request', async () => {
    const invalidRequest = {
      fullAddress: '123 Missing ID, No City, NC'
    };
    const res = await request.post('/checkAddress').send(invalidRequest);

    expect(res.status).toBe(500);
    expect(res.text).toContain('property_id undefined');
  });

});
