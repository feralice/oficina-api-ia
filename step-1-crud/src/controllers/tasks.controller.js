function titleIsValid(title) {
  return typeof title === 'string' && title.length >= 1 && title.length <= 100;
}

export function createTasksController(service) {
  return {
    create(req, res) {
      if (!titleIsValid(req.body?.title)) {
        return res.status(400).json({ error: 'title deve ter de 1 a 100 caracteres' });
      }
      res.status(201).json(service.create(req.body));
    },

    list(req, res) {
      res.json(service.list());
    },

    get(req, res) {
      const task = service.get(req.params.id);
      if (!task) return res.status(404).json({ error: 'tarefa não encontrada' });
      res.json(task);
    },

    update(req, res) {
      const { title, done } = req.body ?? {};
      if (title !== undefined && !titleIsValid(title)) {
        return res.status(400).json({ error: 'title deve ter de 1 a 100 caracteres' });
      }
      if (done !== undefined && typeof done !== 'boolean') {
        return res.status(400).json({ error: 'done deve ser true ou false' });
      }
      const task = service.update(req.params.id, { title, done });
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
