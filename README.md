# oficina-api-ia

Material da oficina de back-end Node.js com IA (spec-driven + segurança).
Uma API de tarefas em Express, com dados em memória e sem banco.

## Pré-requisitos

- Node 20 ou mais (confira com `node -v`)
- VSCode, ou outro editor que você goste

## Pegar o código

```bash
git clone https://github.com/feralice/oficina-api-ia.git
cd oficina-api-ia
npm install
```

Sem Git: na página do repositório, clique em **Code > Download ZIP**, extraia, abra a pasta e rode `npm install`.

## O que tem aqui

| Arquivo | O que é |
|---|---|
| `spec.md` | O que a API deve fazer (o contrato que a IA lê) |
| `AGENTS.md` | As regras do projeto (a IA lê sempre) |
| `skills/seguranca-api/SKILL.md` | Checklist de segurança pra revisar rotas |
| `exercicio.js` | A API inteira num arquivo só, com 4 bugs de segurança |
| `exercicio.test.js` | Os testes que mostram os bugs |
| `solucao.js` | A mesma API consertada (não abra antes de tentar) |
| `demo.mjs` | Os 4 ataques, rodando sem curl |
| `teste-do-zero/` | Teste pra conferir a API que você construir do zero com IA |

## Comandos

| Comando | O que faz |
|---|---|
| `npm test` | Roda os testes do exercício. No começo **6 falham, de propósito** |
| `npm run dev` | Sobe o `exercicio.js` em http://localhost:3000 |
| `npm run demo` | Com a API rodando, em outro terminal: mostra os ataques |
| `npm run solucao` | Sobe o `solucao.js`, pra ver os ataques barrados |

## O exercício

Deixe o `npm test` verde mexendo só no `exercicio.js`. O passo a passo e as dicas estão em [EXERCICIO.md](EXERCICIO.md).

## Login de mentira

Não tem login de verdade: quem diz qual é o usuário é o header `x-user-id`, e a gente usa os usuários `1` e `2`. Sem esse header a API responde 401. Numa API real o usuário viria de um token validado no servidor.

## Construir do zero com IA

Numa pasta nova, fora deste repo:

```bash
mkdir minha-api
cd minha-api
npm init -y
npm pkg set type=module
npm install express@4 zod@3
```

Peça pra IA o plano e depois o código a partir do `spec.md` e do `AGENTS.md`, com o `src/app.js` exportando `createApp()` sem chamar `listen`. Depois copie a pasta `teste-do-zero` pra dentro de `minha-api` e rode `node --test teste-do-zero/tasks.test.js`.

## Deu problema?

**Node antigo.** Se `node -v` for menor que 20, os testes podem dar `bad option: --test` ou travar. Instale o Node 20 ou 22 LTS em https://nodejs.org e abra um terminal novo.

**Porta 3000 ocupada** (`EADDRINUSE`). Use outra porta. No bash: `PORT=3100 npm run dev` e `PORT=3100 npm run demo`. No PowerShell: `$env:PORT=3100; npm run dev` e `$env:PORT=3100; npm run demo`.

**PowerShell bloqueando o npm** (`npm.ps1 cannot be loaded`). Use `npm.cmd` no lugar de `npm`, ou troque o terminal do VSCode pra Command Prompt ou Git Bash.

**`npm install` bloqueado pela rede.** Tente o roteador do celular, ou peça pra quem está dando a oficina um zip com `node_modules`.
