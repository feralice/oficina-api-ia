export function createTasksService() {
  const tasks = [];
  let nextId = 1;

  return {
    listByUser: (userId) => tasks.filter((t) => t.userId === userId),
    get: (id) => tasks.find((t) => t.id === id), // IDOR: não olha o dono
    create: (userId, data) => {
      // mass assignment: espalha o body inteiro na tarefa
      const task = { id: String(nextId++), done: false, userId, ...data };
      tasks.push(task);
      return task;
    },
    update: (id, data) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return undefined;
      return Object.assign(task, data); // mass assignment
    },
    remove: (id) => {
      const index = tasks.findIndex((t) => t.id === id);
      if (index === -1) return false;
      tasks.splice(index, 1);
      return true;
    },
  };
}
