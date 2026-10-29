export function createTasksService() {
  const tasks = [];
  let nextId = 1;

  // Só devolve a tarefa se ela for do usuário.
  const findOwned = (id, userId) =>
    tasks.find((t) => t.id === id && t.userId === userId);

  return {
    listByUser: (userId) => tasks.filter((t) => t.userId === userId),
    get: (id, userId) => findOwned(id, userId),
    create: (userId, data) => {
      const task = { id: String(nextId++), title: data.title, done: false, userId };
      tasks.push(task);
      return task;
    },
    update: (id, userId, data) => {
      const task = findOwned(id, userId);
      if (!task) return undefined;
      return Object.assign(task, data);
    },
    remove: (id, userId) => {
      const task = findOwned(id, userId);
      if (!task) return false;
      tasks.splice(tasks.indexOf(task), 1);
      return true;
    },
  };
}
