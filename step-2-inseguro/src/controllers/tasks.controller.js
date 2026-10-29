export function createTasksController(service) {
  return {
    create(req, res) {
      if (!req.body.title) {
        return res.status(400).json({ error: 'title é obrigatório' });
      }
      res.status(201).json(service.create(req.user.id, req.body));
    },

    list(req, res) {
      res.json(service.listByUser(req.user.id));
    },

    get(req, res) {
      const task = service.get(req.params.id);
      if (!task) return res.status(404).json({ error: 'tarefa não encontrada' });
      res.json(task);
    },

    update(req, res) {
      const task = service.update(req.params.id, req.body);
      if (!task) return res.status(404).json({ error: 'tarefa não encontrada' });
      res.json(task);
    },

    remove(req, res) {
      if (!service.remove(req.params.id)) {
        return res.status(404).json({ error: 'tarefa não encontrada' });
      }
      res.status(204).end();
    },
  };
}
