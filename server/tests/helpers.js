


const supertest = require('supertest');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('../dist/routers/router').default
const prisma = require('../src/db').default


const app = new Koa();
app.use(bodyParser());
app.use(router.routes());
const request = supertest.agent(app.callback())

const { demoReview } = require('./testData')

const registerUser = async () => {
  const newUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123'
  };
  return await request.post('/signup').send(newUser)
}

const addReview = async (property_id, accessToken) => {
  const res = await request.post(`/addreview/${property_id}`)
    .set('Authorization', accessToken)
    .send(demoReview)

  if (res.status === 500) {
    console.log('error adding a review')
  }
  return res;
}



const deleteAll = async () => {
  await prisma.photo.deleteMany({})
  await prisma.search.deleteMany({})
  await prisma.favourite.deleteMany({})
  await prisma.review.deleteMany({})
  await prisma.property.deleteMany({})
  await prisma.tenant.deleteMany({})
}

module.exports = { deleteAll, addReview, registerUser }