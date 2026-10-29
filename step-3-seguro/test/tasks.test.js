import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../src/app.js';

// Usuários de mentira: "1" e "2"
async function start(t) {
  const server = createApp().listen(0);
  await once(server, 'listening');
  t.after(() => {
    server.closeAllConnections();
    server.close();
  });
  const base = `http://localhost:${server.address().port}`;

  return async (method, path, { user, body, raw } = {}) => {
    const res = await fetch(base + path, {
      method,
      headers: {
        'content-type': 'application/json',
        ...(user ? { 'x-user-id': user } : {}),
      },
      body: raw ?? (body === undefined ? undefined : JSON.stringify(body)),
    });
    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {}
    return { status: res.status, body: json, text };
  };
}

test('POST /tasks cria uma tarefa', async (t) => {
  const call = await start(t);
  const res = await call('POST', '/tasks', { user: '1', body: { title: 'estudar' } });
  assert.equal(res.status, 201);
  assert.equal(res.body.title, 'estudar');
  assert.equal(res.body.userId, '1');
});

test('POST sem title retorna 400', async (t) => {
  const call = await start(t);
  const res = await call('POST', '/tasks', { user: '1', body: {} });
  assert.equal(res.status, 400);
});

test('POST com title de 101 caracteres retorna 400', async (t) => {
  const call = await start(t);
  const res = await call('POST', '/tasks', { user: '1', body: { title: 'a'.repeat(101) } });
  assert.equal(res.status, 400);
});

test('sem x-user-id retorna 401', async (t) => {
  const call = await start(t);
  const res = await call('GET', '/tasks');
  assert.equal(res.status, 401);
});

test('GET /tasks lista só as tarefas do usuário', async (t) => {
  const call = await start(t);
  await call('POST', '/tasks', { user: '1', body: { title: 'da 1' } });
  await call('POST', '/tasks', { user: '2', body: { title: 'da 2' } });
  const res = await call('GET', '/tasks', { user: '1' });
  assert.equal(res.body.length, 1);
  assert.equal(res.body[0].title, 'da 1');
});

test('IDOR: GET /tasks/:id de outro usuário retorna 404', async (t) => {
  const call = await start(t);
  const { body: task } = await call('POST', '/tasks', { user: '1', body: { title: 'segredo' } });
  const res = await call('GET', `/tasks/${task.id}`, { user: '2' });
  assert.equal(res.status, 404);
});

test('IDOR: PATCH e DELETE de outro usuário retornam 404', async (t) => {
  const call = await start(t);
  const { body: task } = await call('POST', '/tasks', { user: '1', body: { title: 'minha' } });
  const patch = await call('PATCH', `/tasks/${task.id}`, { user: '2', body: { done: true } });
  const del = await call('DELETE', `/tasks/${task.id}`, { user: '2' });
  assert.equal(patch.status, 404);
  assert.equal(del.status, 404);
});

test('mass assignment: PATCH não troca o dono da tarefa', async (t) => {
  const call = await start(t);
  const { body: task } = await call('POST', '/tasks', { user: '1', body: { title: 'minha' } });
  await call('PATCH', `/tasks/${task.id}`, { user: '1', body: { userId: '2' } });
  const lista = await call('GET', '/tasks', { user: '1' });
  assert.equal(lista.body.length, 1, 'a tarefa deixou de ser do dono');
});

test('mass assignment: POST ignora campos que o cliente não pode mandar', async (t) => {
  const call = await start(t);
  const res = await call('POST', '/tasks', {
    user: '1',
    body: { title: 'x', userId: '2', done: true },
  });
  assert.equal(res.body.userId, '1');
  assert.equal(res.body.done, false);
});

test('JSON inválido retorna 400 sem vazar detalhes internos', async (t) => {
  const call = await start(t);
  const res = await call('POST', '/tasks', { user: '1', raw: '{ quebrado' });
  assert.equal(res.status, 400);
  assert.ok(!res.text.includes('stack'), 'a resposta vazou o stack trace');
  assert.ok(!res.text.includes('node_modules'), 'a resposta vazou caminhos internos');
});
