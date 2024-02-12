# Lemon Market

The rental market in the UK is ever increasing and a lack of transparency and accountabilty of landlords places many current or future tennants in a stressful position.

Lemon Market is a PWA allowing users to search for properties, read and leave reviews, increasing transparency in the market and helping tennats avoid those 'Lemons'.
 
# Front-end tech stack

Framework: React bootstrapped with Next.js PWA (App Router)
Additional: Material UI, React Google places, React responsive carousel
APIs: Google maps and OpenAI
Testing: JEST

# CI / CD

CI / CD utilises Github Actions and netlify for the client and fly.io for the server.

# NPM I

Open the Lemon-Market root folder

front-end:
`cd client`
`npm i`
`npm run dev`
back-end:
`cd server`
`npm i`
`npm run dev`

# Getting started

#### Client
Minimu requirements to run all functionality within the app you will require:

1) Generate a Google places API key from https://console.cloud.google.com/marketplace/product/google/places-backend.googleapis.com
2) Signup to cloudinary and generate a cloudinary name https://cloudinary.com/documentation/how_to_integrate_cloudinary
3) Sign up to OpenAI playground and generate an API key https://platform.openai.com/playground
4) Create an env.local file, replicating the env.local-example.js with your keys above.

Running the client locally on port 3001:
`cd client`
`npm run dev`

Additonal:
5) Per the server setup noted below, add the fly.io https link to env.local file to access the public server.



#### Server and DB
1) Install a local PostgreSQL server to store data


