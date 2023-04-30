import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import createSequelizeConnection from './repository/postgres.js';
import { createNewRepository } from './repository/repository.js';
import { createNewServices } from './service/service.js';
import { createNewHandler } from './handler/handler.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const db = createSequelizeConnection();



const Repository = createNewRepository(db);

const services = createNewServices(Repository)

const handler = createNewHandler(services)

app.use(handler.initRoutes(express.Router()))

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});