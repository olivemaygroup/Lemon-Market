const supertest = require('supertest');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('../dist/routers/router').default;
const { describe, expect, beforeAll, beforeEach, afterAll, it } = require('@jest/globals');
const { deleteAll, addReview, registerUser } = require('./helpers.js');
const prisma = require('../src/db').default;

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());
const request = supertest.agent(app.callback());

describe('Favorites functionality', () => {

  const testPropertyId = 'test_id;'
  const testFullAddress = '21 test road'

  let demoAccessToken;

  beforeAll(async () => {
    await deleteAll();
    const registerResponse = await registerUser();
    demoAccessToken = registerResponse.body.accessToken;
  });

  afterAll(async () => {
    await deleteAll();
  });

  describe('Add, get and remove favorite functionality', () => {
    it('successfully adds a property to favorites', async () => {

      const newProperty = {
        property_id: testPropertyId,
        fullAddress: testFullAddress
      };

      await request.post('/checkAddress').send(newProperty);

      const response = await request.post(`/addfavourites/${testPropertyId}`)
        .set('Authorization', demoAccessToken);


      expect(response.status).toBe(200);
      expect(response.text).toContain('property added to favourites');
    });

    it('retrieves the list of favorite properties for the tenant', async () => {

      const response = await request.get('/getfavourites')
        .set('Authorization', demoAccessToken);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].property_id).toBe(testPropertyId)
    });

    it('successfully removes a property from favorites', async () => {


      const removeResponse = await request.delete(`/deletefavourite/${testPropertyId}`)
        .set('Authorization', demoAccessToken);

      expect(removeResponse.status).toBe(200);
      expect(removeResponse.text).toContain('Favourite deleted');
    });
  });
});
