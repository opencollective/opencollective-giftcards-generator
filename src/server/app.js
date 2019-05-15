import './env';

import path from 'path';
import express from 'express';
import next from 'next';
import cors from 'cors';

import { loggerMiddleware } from './logger';
import routes from './routes';
import { ENV, WEBSITE_URL } from '../constants/env';

const isDev = ['development', 'docker', 'test'].includes(ENV);
const server = express();
const nextApp = next({ dev: isDev, dir: path.dirname(__dirname) });
server.next = nextApp;

nextApp.prepare().then(() => {
  // Configure loggers
  server.use(loggerMiddleware.logger);
  server.use(loggerMiddleware.errorLogger);

  // Set CORS for frontend
  server.use(cors({ origin: WEBSITE_URL }));

  // Configure routes
  server.use(express.json());
  server.use(routes(server, nextApp));
});

export default server;
