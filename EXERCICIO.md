# Sua vez: ache e conserte (step 2)

O step 2 é uma API de tarefas com bugs de segurança, e os testes mostram onde eles estão.

**Objetivo:** deixar o `npm run test:2` 100% verde (10 de 10), mexendo só nos arquivos de `step-2-inseguro/src`. Os testes não podem ser alterados.

## Antes de começar

- Você já rodou `npm install` e o `npm run test:1` passou (veja o [README](README.md)).
- No VSCode, abra a pasta **raiz** do projeto (`oficina-api-ia`), não a pasta do step. Os comandos `npm run` só funcionam a partir da raiz.

## Passo a passo

1. Rode `npm run test:2`. No fim da saída devem aparecer `# pass 4` e `# fail 6`.
2. Procure as linhas que começam com `not ok`. Cada uma é um teste falhando, e o nome já diz o que a API deveria fazer.
3. Abra `step-2-inseguro/test/tasks.test.js` e leia o teste que falha: o que ele manda pra API e o que ele espera de volta.
4. (Opcional) Veja o ataque acontecendo: rode `npm run dev:2` num terminal e `npm run demo` em outro.
5. Com as 5 perguntas abaixo, ache o trecho do código em `step-2-inseguro/src` que causa a falha.
6. Conserte um problema por vez e rode `npm run test:2` de novo. O número de `fail` tem que cair.
7. Repita até aparecer `# fail 0`.

Se mexer num arquivo e algo que passava começar a falhar, desfaça a última mudança (`Ctrl+Z`) e tente de outro jeito.

## As 5 perguntas

| Pergunta | Onde olhar |
|---|---|
| Quem pode chamar isso? | Tem login? Tem limite de chamadas? |
| O que entra sem validar? | body, query, params e headers |
| De quem é esse dado? | A rota checa o dono do recurso? |
| Que segredo está no código? | Chave, senha, token |
| O que sai no erro e no log? | Stack trace, senha, token |

## Travou? Dicas em 3 níveis

Tente sozinho antes de abrir a próxima.

<details>
<summary>Nível 1: qual pergunta responde cada teste</summary>

| Teste que falha | Pergunta |
|---|---|
| title de 101 caracteres | O que entra sem validar? |
| IDOR (GET, PATCH e DELETE de outro usuário) | De quem é esse dado? |
| mass assignment (PATCH e POST) | O que entra sem validar? |
| JSON inválido sem vazar detalhes | O que sai no erro? |

</details>

<details>
<summary>Nível 2: em qual arquivo mexer</summary>

- Validação e campos permitidos: `src/controllers/tasks.controller.js` (e, se quiser, um `src/schemas.js` com Zod, que já está instalado)
- Dono do recurso: `src/services/tasks.service.js` (as funções `get`, `update` e `remove` não olham o `userId`)
- Erro que vaza: `src/middleware/error-handler.js`

</details>

<details>
<summary>Nível 3: o que fazer</summary>

- Nas funções `get`, `update` e `remove`, receba o `userId` e só ache a tarefa se `t.userId === userId`. Se não achar, o controller já devolve 404. Lembre de passar `req.user.id` do controller pro service.
- Não faça `Object.assign(task, req.body)` nem `...data`. Pegue só `title` e `done`, e valide: title com 1 a 100 caracteres, done boolean. Com Zod, `z.object({...})` já descarta campos extras.
- No error handler, não devolva `err.stack`. Devolva uma mensagem fixa e deixe o detalhe só no `console.error`. JSON quebrado chega com `err.type === 'entity.parse.failed'` e deve virar 400.

</details>

## Terminou?

Compare com `step-3-seguro`. A sua solução não precisa ser igual, só passar nos testes. Depois rode `npm run dev:2` e `npm run demo` de novo: os ataques devem ser barrados.
