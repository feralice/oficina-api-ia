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

São só 2 arquivos. Não precisa mexer no service.

- Título sem limite, dono da tarefa e campos que não deviam entrar: `src/controllers/tasks.controller.js`
- Erro que vaza: `src/middleware/error-handler.js`

Cada conserto é uma ou duas linhas.

</details>

<details>
<summary>Nível 3: o que fazer</summary>

- **Título:** no `create`, o `if` só confere se o title existe. Faça ele conferir também se tem mais de 100 caracteres (`.length`).
- **Dono da tarefa:** no `get`, `update` e `remove`, o `if (!task)` só confere se a tarefa existe. Faça ele dar 404 também quando `task.userId` for diferente de `req.user.id`. É a mesma mudança nos 3 lugares.
- **Campos que não deviam entrar:** no `create`, o `done` e o dono (`userId`) vêm do `req.body`, então o cliente escolhe. Toda tarefa nova começa com `done: false` e o dono é sempre `req.user.id`. No `update`, apague a linha que deixa o cliente trocar o `userId`.
- **Erro que vaza:** no error handler, tire o `stack` da resposta.

</details>

## Terminou?

Compare com `step-3-seguro`. A sua solução não precisa ser igual, só passar nos testes. Depois rode `npm run dev:2` e `npm run demo` de novo: os ataques devem ser barrados.
