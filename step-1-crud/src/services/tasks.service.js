export function createTasksService() {
  const tasks = [];
  let nextId = 1;

  return {
    list: () => tasks,
    get: (id) => tasks.find((t) => t.id === id),
    create: (data) => {
      const task = { id: String(nextId++), title: data.title, done: false };
      tasks.push(task);
      return task;
    },
    update: (id, data) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return undefined;
      if (data.title !== undefined) task.title = data.title;
      if (data.done !== undefined) task.done = data.done;
      return task;
    },
    remove: (id) => {
      const index = tasks.findIndex((t) => t.id === id);
      if (index === -1) return false;
      tasks.splice(index, 1);
      return true;
    },
  };
}
