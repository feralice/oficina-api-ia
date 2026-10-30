// API de tarefas com 4 bugs de segurança. Ache e conserte até o `npm test` ficar verde.
import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  // Login de mentira: o usuário vem do header x-user-id.
  app.use((req, res, next) => {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(401).json({ error: 'informe o header x-user-id' });
    }
    req.userId = userId;
    next();
  });

  const tasks = [];
  let nextId = 1;

  app.post('/tasks', (req, res) => {
    if (!req.body.title) {
      return res.status(400).json({ error: 'title deve ter de 1 a 100 caracteres' });
    }
    const task = {
      id: String(nextId++),
      title: req.body.title,
      done: req.body.done || false,
      userId: req.body.userId || req.userId,
    };
    tasks.push(task);
    res.status(201).json(task);
  });

  app.get('/tasks', (req, res) => {
    res.json(tasks.filter((t) => t.userId === req.userId));
  });

  app.get('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'tarefa não encontrada' });
    }
    res.json(task);
  });

  app.patch('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'tarefa não encontrada' });
    }
    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.done !== undefined) task.done = req.body.done;
    if (req.body.userId !== undefined) task.userId = req.body.userId;
    res.json(task);
  });

  app.delete('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'tarefa não encontrada' });
    }
    tasks.splice(tasks.indexOf(task), 1);
    res.status(204).end();
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message, stack: err.stack });
  });

  return app;
}

// O teste importa este arquivo sem subir o servidor.
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log(`API em http://localhost:${port}`));
}
