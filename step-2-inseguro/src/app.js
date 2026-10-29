import express from 'express';
import { fakeAuth } from './middleware/auth.js';
import { errorHandler } from './middleware/error-handler.js';
import { createTasksService } from './services/tasks.service.js';
import { createTasksController } from './controllers/tasks.controller.js';
import { createTasksRouter } from './routes/tasks.routes.js';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(fakeAuth);

  const service = createTasksService();
  const controller = createTasksController(service);
  app.use('/tasks', createTasksRouter(controller));

  app.use(errorHandler);
  return app;
}
