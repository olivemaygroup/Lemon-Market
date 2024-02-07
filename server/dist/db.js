"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dataBaseURL = process.env.ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: dataBaseURL
        }
    }
});
exports.default = prisma;
