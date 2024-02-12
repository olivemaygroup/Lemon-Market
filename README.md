# Lemon Market

The rental market in the UK is ever increasing and lacks transparency and accountabilty of landlords, placing many current or future tennants in a stressful position.

Lemon Market is a next.js PWA allowing users to search for properties, read and leave reviews, increasing transparency in the market and helping tennats avoid those 'Lemons'.
 
## Tech stack

**Client**
- Framework: React bootstrapped with Next.js PWA (App Router)
- Additional: Material UI, React Google places, React responsive carousel
- APIs: Google maps and OpenAI

**server**
- KOA
- JWT for authentication
- Prisma ORM

**Database**
- AWS realtional database server or PostgreSQL locally

**Testing**
- JEST and supertest(backend)

## CI / CD

CI / CD was implemented with Github Actions, netlify for the client and fly.io for the server.

## NPM installation

Open the Lemon-Market root folder

**front-end**:
`cd client`
`npm i`

**back-end**:
`cd server`
`npm i`

## Getting started

**Client**

To run all functionality within the app, the minimum you will require:

1) Generate a Google places API key from https://console.cloud.google.com/marketplace/product/google/places-backend.googleapis.com
2) Signup to cloudinary and generate a cloudinary name https://cloudinary.com/documentation/how_to_integrate_cloudinary
3) Sign up to OpenAI playground and generate an API key https://platform.openai.com/playground
4) Create an env.local file, replicating the env.local-example.js with your keys above.

Running the client locally on port 3001:
`cd client`
`npm run dev`

**Additional client**

5) Per the server setup noted below, add the fly.io or deployment of your choice to env.local file to access the public server


**Server and DB**

To run all functionality within the app, the minimum you will require:
1) Local installation of PostgreSQL for data storage
2) Create your .env file per env-eample.js
3) Replace:
- DATABASE_URL (Your local PostgreSQL http)
- PORT
- SECRET_KEY (for JWT authentication)
- TEST_DATABASE_URL (Your local test PostgreSQL http)
4) If you have not initiated the connection with Prisma and PostgreSQL run `npm run connect`.

Run `npm run dev` to start the server.
Run `npm run test` on Mac or `npm run testwindows` on Windows to test the backend. Ensure TEST_DATABASE has an appropriate DB connection.

**Additional server**

5) AWS relational database service can be used to host the production and testing databases. Update the DATABASE_URL and TEST_DATABASE_URL accordingly in the .env file. 

**Deployment**

1. Docker file is currently setup with fly.toml to deploy with `npm run prod`.
2. You may need to ensure module import compabitility depending on your chosen deployment process.