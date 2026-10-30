// Os bugs do exercício estão neste arquivo e em middleware/error-handler.js.
export function createTasksController(service) {
  return {
    create(req, res) {
      if (!req.body.title) {
        return res.status(400).json({ error: 'title deve ter de 1 a 100 caracteres' });
      }
      const task = service.create({
        title: req.body.title,
        done: req.body.done || false,
        userId: req.body.userId || req.user.id,
      });
      res.status(201).json(task);
    },

    list(req, res) {
      res.json(service.listByUser(req.user.id));
    },

    get(req, res) {
      const task = service.get(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'tarefa não encontrada' });
      }
      res.json(task);
    },

    update(req, res) {
      const task = service.get(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'tarefa não encontrada' });
      }
      const changes = {
        title: req.body.title,
        done: req.body.done,
        userId: req.body.userId,
      };
      res.json(service.update(task, changes));
    },

    remove(req, res) {
      const task = service.get(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'tarefa não encontrada' });
      }
      service.remove(task);
      res.status(204).end();
    },
  };
}
