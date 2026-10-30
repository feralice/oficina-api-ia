// A mesma API do exercicio.js, com os 4 bugs consertados. Cada conserto está marcado.
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
    // CONSERTO: o title tem limite de 100 caracteres
    if (!req.body.title || req.body.title.length > 100) {
      return res.status(400).json({ error: 'title deve ter de 1 a 100 caracteres' });
    }
    const task = {
      id: String(nextId++),
      title: req.body.title,
      done: false, // CONSERTO: toda tarefa nova começa não feita
      userId: req.userId, // CONSERTO: o dono vem do login, não do body
    };
    tasks.push(task);
    res.status(201).json(task);
  });

  app.get('/tasks', (req, res) => {
    res.json(tasks.filter((t) => t.userId === req.userId));
  });

  app.get('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    // CONSERTO: tarefa de outra pessoa responde como se não existisse
    if (!task || task.userId !== req.userId) {
      return res.status(404).json({ error: 'tarefa não encontrada' });
    }
    res.json(task);
  });

  app.patch('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    // CONSERTO: confere o dono
    if (!task || task.userId !== req.userId) {
      return res.status(404).json({ error: 'tarefa não encontrada' });
    }
    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.done !== undefined) task.done = req.body.done;
    // CONSERTO: a linha que deixava trocar o userId foi apagada
    res.json(task);
  });

  app.delete('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    // CONSERTO: confere o dono
    if (!task || task.userId !== req.userId) {
      return res.status(404).json({ error: 'tarefa não encontrada' });
    }
    tasks.splice(tasks.indexOf(task), 1);
    res.status(204).end();
  });

  app.use((err, req, res, next) => {
    // CONSERTO: sem stack na resposta
    res.status(err.status || 500).json({ error: err.message });
  });

  return app;
}

// O teste importa este arquivo sem subir o servidor.
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log(`API em http://localhost:${port}`));
}
