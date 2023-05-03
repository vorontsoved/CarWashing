import express, { Express } from 'express';
import dotenv from 'dotenv';
import { createSequelizeConnection } from './repository/postgres.js';
import { createNewRepository } from './repository/repository.js';
import { createNewServices } from './service/service.js';
import { Handler } from './handler/handler.js';
import { Dialect } from 'sequelize';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const db = await createSequelizeConnection(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_HOST as string,
  process.env.DB_DRIVER as Dialect,
  process.env.DB_PASSWORD as string
);

try {
  await db.sequelize.authenticate()
  console.log('Соединение с БД было успешно установлено')
} catch (e) {
  console.log('Невозможно выполнить подключение к БД: ', e)
  process.exit(1);
}

const Repository = createNewRepository(db);

const services = createNewServices(Repository)

const handler = new Handler(services)

app.use(handler.initRoutes(express.Router()))

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const shutdown = async () => {
  try {
    await db.sequelize.close()
    console.log('Соединение с БД успешно закрыто')
  } catch (e) {
    console.log('Соединение с БД не удалось закрыть')
  }
  server.close((err) => {
    if (err) {
      console.log('Ошибка при остановке сервера:', err.message)
      process.exit(1);
    }
    process.exit(0);
  })
}

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)