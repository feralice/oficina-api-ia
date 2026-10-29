import { createTaskSchema, updateTaskSchema } from '../schemas.js';

export function createTasksController(service) {
  return {
    create(req, res) {
      const parsed = createTaskSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'title deve ter de 1 a 100 caracteres' });
      }
      res.status(201).json(service.create(req.user.id, parsed.data));
    },

    list(req, res) {
      res.json(service.listByUser(req.user.id));
    },

    get(req, res) {
      const task = service.get(req.params.id, req.user.id);
      if (!task) return res.status(404).json({ error: 'tarefa não encontrada' });
      res.json(task);
    },

    update(req, res) {
      const parsed = updateTaskSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'dados inválidos' });
      }
      const task = service.update(req.params.id, req.user.id, parsed.data);
      if (!task) return res.status(404).json({ error: 'tarefa não encontrada' });
      res.json(task);
    },

    remove(req, res) {
      if (!service.remove(req.params.id, req.user.id)) {
        return res.status(404).json({ error: 'tarefa não encontrada' });
      }
      res.status(204).end();
    },
  };
}
