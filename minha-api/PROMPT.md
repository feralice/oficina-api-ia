# Prompt pra construir a minha-api com IA

Copie o texto abaixo, cole na IA (ChatGPT, Gemini, Copilot...) e troque cada "(cole aqui)" pelo conteúdo do arquivo.

```text
Vou construir uma API de tarefas em Node.js com Express, usando ES modules (import/export).
Abaixo estão a spec da API, as regras do projeto e 3 arquivos que você vai preencher.

Primeiro me mostre o plano em até 5 linhas.
Depois me devolva os 3 arquivos completos, um de cada vez, com o caminho no topo.
Regras extras:
- Mantenha os nomes das funções exportadas.
- Só express e zod estão instalados. Não use outra biblioteca.
- Ignore o x-user-id por enquanto: esta versão não tem usuário.

--- spec.md ---
(cole aqui)

--- AGENTS.md ---
(cole aqui)

--- src/routes/tasks.routes.js ---
(cole aqui)

--- src/controllers/tasks.controller.js ---
(cole aqui)

--- src/services/tasks.service.js ---
(cole aqui)
```

Depois de colar o que a IA devolveu nos 3 arquivos, rode no terminal:

```bash
npm run test:minha-api
```

Deu 7 de 7? A IA fez o que a spec pede. Falhou algum? Cole a mensagem do erro na IA e peça o conserto.
