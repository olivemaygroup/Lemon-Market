const supertest = require('supertest');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('../dist/routers/router').default;
const { describe, expect, beforeAll, afterAll, it } = require('@jest/globals');
const { deleteAll, addReview, registerUser } = require('./helpers.js');
const { demoReview } = require('./testData');
const prisma = require('../src/db').default;

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());
const request = supertest.agent(app.callback());

const testPropertyId = 'test_id;'
const testFullAddress = '21 test road'

describe('Review functionality', () => {
  let demoAccessToken;

  beforeAll(async () => {
    await deleteAll();
    const registerResponse = await registerUser();
    demoAccessToken = registerResponse.body.accessToken;
  });

  afterAll(async () => {
    await deleteAll();
  });

  describe('Add review functionality', () => {

    it('Does not add review as the property does not exist', async () => {
      const response = await addReview(testPropertyId, demoAccessToken)

      expect(response.status).toBe(402);
      expect(response.text).toBe('property does not exist');
    })

    it('successfully adds a review', async () => {

      const newProperty = {
        property_id: testPropertyId,
        fullAddress: testFullAddress
      };
      const res = await request.post('/checkAddress').send(newProperty);

      const response = await addReview(testPropertyId, demoAccessToken)

      expect(response.status).toBe(200);
      expect(response.text).toBe('review added');
    });
  });

  describe('My reviews functionality', () => {

    it('retrieves tenant reviews', async () => {
      const response = await request.get('/myreviews') // Adjust the path as needed
        .set('Authorization', demoAccessToken);

      expect(response.status).toBe(200);
      expect(response.body[0].reviews).toBeInstanceOf(Array);
    });
  });
});
