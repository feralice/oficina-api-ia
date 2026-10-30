# Sua vez: ache e conserte

O `exercicio.js` é uma API de tarefas com 4 bugs de segurança, e os testes mostram onde eles estão.

**Objetivo:** deixar o `npm test` 100% verde (10 de 10), mexendo só no `exercicio.js`. Não mude os testes.

## Passo a passo

1. Rode `npm test`. No fim devem aparecer `# pass 4` e `# fail 6`.
2. Procure as linhas que começam com `not ok`. O nome de cada teste diz o que a API deveria fazer.
3. (Opcional) Veja o ataque: `npm run dev` num terminal e `npm run demo` em outro.
4. Abra o `exercicio.js` e ache a linha que causa a falha. Use as 5 perguntas abaixo.
5. Conserte um bug por vez e rode `npm test` de novo. O número de `fail` tem que cair.
6. Repita até aparecer `# fail 0`.

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
<summary>Nível 2: em qual parte do arquivo</summary>

- Título sem limite: na rota `app.post`
- Dono da tarefa: nas rotas `app.get('/tasks/:id')`, `app.patch` e `app.delete`
- Campos que não deviam entrar: na rota `app.post` e na `app.patch`
- Erro que vaza: no último `app.use`, no fim do arquivo

Cada conserto é uma ou duas linhas.

</details>

<details>
<summary>Nível 3: o que fazer</summary>

- **Título:** no `app.post`, o `if` só confere se o title existe. Faça ele conferir também se tem mais de 100 caracteres (`.length`).
- **Dono da tarefa:** no `get`, `patch` e `delete`, o `if (!task)` só confere se a tarefa existe. Faça ele dar 404 também quando `task.userId` for diferente de `req.userId`. É a mesma mudança nos 3 lugares.
- **Campos que não deviam entrar:** no `app.post`, o `done` e o dono (`userId`) vêm do `req.body`, então o cliente escolhe. Toda tarefa nova começa com `done: false` e o dono é sempre `req.userId`. No `app.patch`, apague a linha que deixa o cliente trocar o `userId`.
- **Erro que vaza:** no último `app.use`, tire o `stack` da resposta.

</details>

## Terminou?

Rode `npm run dev` e `npm run demo` de novo: os ataques devem ser barrados. Depois compare com o `solucao.js`, onde cada conserto está marcado com `CONSERTO`.
