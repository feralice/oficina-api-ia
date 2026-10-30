export function createTasksService() {
  const tasks = [];
  let nextId = 1;

  return {
    listByUser: (userId) => tasks.filter((t) => t.userId === userId),
    get: (id) => tasks.find((t) => t.id === id),
    create: (data) => {
      const task = {
        id: String(nextId++),
        title: data.title,
        done: data.done,
        userId: data.userId,
      };
      tasks.push(task);
      return task;
    },
    update: (task, changes) => {
      if (changes.title !== undefined) task.title = changes.title;
      if (changes.done !== undefined) task.done = changes.done;
      if (changes.userId !== undefined) task.userId = changes.userId;
      return task;
    },
    remove: (task) => {
      tasks.splice(tasks.indexOf(task), 1);
    },
  };
}
