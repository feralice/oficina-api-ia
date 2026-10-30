// Já pronto: liga as 3 camadas. Vocês vão preencher os outros arquivos com a IA.
import express from 'express';
import { createTasksService } from './services/tasks.service.js';
import { createTasksController } from './controllers/tasks.controller.js';
import { createTasksRouter } from './routes/tasks.routes.js';

export function createApp() {
  const app = express();
  app.use(express.json());

  const service = createTasksService();
  const controller = createTasksController(service);
  app.use('/tasks', createTasksRouter(controller));

  return app;
}
