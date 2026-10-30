# Links e arquivos da oficina

## Links

| O que | Link |
|---|---|
| Abrir no navegador (StackBlitz, sem instalar nada) | https://stackblitz.com/github/feralice/oficina-api-ia |
| Repositório no GitHub | https://github.com/feralice/oficina-api-ia |
| Baixar o ZIP | https://github.com/feralice/oficina-api-ia/archive/refs/heads/main.zip |
| Clonar com Git | `git clone https://github.com/feralice/oficina-api-ia.git` |

## Arquivos

| Arquivo | O que é | Quando usa |
|---|---|---|
| `spec.md` | O que a API deve fazer: rotas, regras, erros e aceite | Conceitos e prompt da parte 1 |
| `AGENTS.md` | As regras do projeto, que a IA segue sempre | Conceitos e prompt da parte 1 |
| `skills/seguranca-api/SKILL.md` | Checklist de segurança pra revisar rotas | Conceito de skill |
| `minha-api/PROMPT.md` | O prompt pronto pra colar na IA | Parte 1 |
| `minha-api/src/routes/tasks.routes.js` | Rota (vazia, a IA preenche) | Parte 1 |
| `minha-api/src/controllers/tasks.controller.js` | Controller (vazio, a IA preenche) | Parte 1 |
| `minha-api/src/services/tasks.service.js` | Service (vazio, a IA preenche) | Parte 1 |
| `minha-api/src/app.js` e `server.js` | Já prontos: ligam as camadas e sobem a API | Parte 1 |
| `minha-api/tasks.test.js` | Os 7 testes da parte 1 | Parte 1 |
| `exercicio.js` | A API com usuários e 4 bugs de segurança | Parte 2 |
| `exercicio.test.js` | Os 10 testes da parte 2 (6 falham no começo) | Parte 2 |
| `EXERCICIO.md` | Passo a passo e dicas do exercício | Parte 2 |
| `solucao.js` | A API consertada, cada conserto marcado com `CONSERTO` | Correção |
| `demo.mjs` | Os 4 ataques | Demo de segurança |

## Comandos

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências (o StackBlitz costuma rodar sozinho) |
| `npm run test:minha-api` | Testa a API da parte 1 |
| `npm test` | Testa o exercício da parte 2 |
| `npm run dev` | Sobe o `exercicio.js` |
| `npm run demo` | Roda os ataques (com a API rodando, em outro terminal) |
| `npm run solucao` | Sobe o `solucao.js` |
