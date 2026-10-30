// ROTA: liga cada caminho e verbo ao controller.
// Peça pra IA: POST /, GET /, GET /:id, PATCH /:id e DELETE /:id.
import { Router } from 'express';

export function createTasksRouter(controller) {
  const router = Router();
  return router;
}
