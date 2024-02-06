import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL
    }
  }
});

export default prisma;
