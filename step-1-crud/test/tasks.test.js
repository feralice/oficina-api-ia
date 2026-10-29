import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../src/app.js';

async function start(t) {
  const server = createApp().listen(0);
  await once(server, 'listening');
  t.after(() => {
    server.closeAllConnections();
    server.close();
  });
  const base = `http://localhost:${server.address().port}`;

  return async (method, path, body) => {
    const res = await fetch(base + path, {
      method,
      headers: { 'content-type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await res.text();
    return { status: res.status, body: text ? JSON.parse(text) : null };
  };
}

test('POST /tasks cria uma tarefa', async (t) => {
  const call = await start(t);
  const res = await call('POST', '/tasks', { title: 'estudar' });
  assert.equal(res.status, 201);
  assert.equal(res.body.title, 'estudar');
  assert.equal(res.body.done, false);
});

test('POST sem title retorna 400', async (t) => {
  const call = await start(t);
  const res = await call('POST', '/tasks', {});
  assert.equal(res.status, 400);
});

test('POST com title de 101 caracteres retorna 400', async (t) => {
  const call = await start(t);
  const res = await call('POST', '/tasks', { title: 'a'.repeat(101) });
  assert.equal(res.status, 400);
});

test('GET /tasks lista as tarefas', async (t) => {
  const call = await start(t);
  await call('POST', '/tasks', { title: 'uma' });
  const res = await call('GET', '/tasks');
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 1);
});

test('GET /tasks/:id inexistente retorna 404', async (t) => {
  const call = await start(t);
  const res = await call('GET', '/tasks/999');
  assert.equal(res.status, 404);
});

test('PATCH /tasks/:id atualiza a tarefa', async (t) => {
  const call = await start(t);
  const { body: task } = await call('POST', '/tasks', { title: 'antes' });
  const res = await call('PATCH', `/tasks/${task.id}`, { done: true });
  assert.equal(res.status, 200);
  assert.equal(res.body.done, true);
});

test('DELETE /tasks/:id remove a tarefa', async (t) => {
  const call = await start(t);
  const { body: task } = await call('POST', '/tasks', { title: 'apagar' });
  const res = await call('DELETE', `/tasks/${task.id}`);
  assert.equal(res.status, 204);
  const after = await call('GET', `/tasks/${task.id}`);
  assert.equal(after.status, 404);
});
