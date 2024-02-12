**Backend**

 Backend has been setup with Prisma and PostgreSQL with testing complete with Supertest and Jest.

**Server Setup**
1. Run `npm i` to install dependencies.
2. Create your .env file with a DATABASE_URL, TEST_DATABASE_URL, PORT and SECRET_KEY (for JWT authentication). It is setup for a PostgreSQL database.
3. If you have not initiated the connection with Prisma and PostgreSQL run `npm run connect`.
4. Run `npm run dev` to start the server.
5. Run `npm run test` on Mac or `npm run testwindows` on Windows to test the backend. Ensure TEST_DATABASE has an appropriate DB connection.

**Deployment**
1. Docker file is currently setup with fly.toml to deploy with `npm run prod`.
2. You may need to ensure module import compabitility depending on your chosen deployment process.