# oficina-api-ia

Material da oficina de back-end Node.js com IA (spec-driven + segurança).
Uma API de tarefas em Express, com dados em memória e sem banco.

## Abrir no navegador (não precisa instalar nada)

Abra no Chrome: **https://stackblitz.com/github/feralice/oficina-api-ia**

O projeto abre com editor e terminal. No terminal de baixo, se ele ainda não tiver rodado sozinho:

```bash
npm install
```

Pra IA, use o site que você preferir (ChatGPT, Gemini, Copilot) numa outra aba.

Prefere rodar no seu computador? Precisa de Node 20 ou mais:

```bash
git clone https://github.com/feralice/oficina-api-ia.git
cd oficina-api-ia
npm install
```

## Parte 1: construir a API com IA

A pasta `minha-api` é um esqueleto: as 3 camadas (rota, controller e service) estão vazias, com um comentário dizendo o que pedir pra IA.

1. Rode `npm run test:minha-api`. 6 testes falham (só o do 404 passa), porque a API ainda não tem rota nenhuma.
2. Abra o `minha-api/PROMPT.md`, copie o prompt e cole na IA junto com os arquivos que ele pede.
3. Cole o que a IA devolver nos 3 arquivos de `minha-api/src`.
4. Rode `npm run test:minha-api` de novo. Deu 7 de 7? A IA fez o que a spec pede.

## Parte 2: ache e conserte

O `exercicio.js` é a mesma API de tarefas, agora com usuários e 4 bugs de segurança de propósito.

| Comando | O que faz |
|---|---|
| `npm test` | Roda os testes do exercício. No começo **6 falham, de propósito** |
| `npm run dev` | Sobe o `exercicio.js` |
| `npm run demo` | Com a API rodando, em outro terminal: mostra os ataques |
| `npm run solucao` | Sobe o `solucao.js`, pra ver os ataques barrados |

Deixe o `npm test` verde mexendo só no `exercicio.js`. O passo a passo e as dicas estão em [EXERCICIO.md](EXERCICIO.md).

## O que tem aqui

| Arquivo | O que é |
|---|---|
| `spec.md` | O que a API deve fazer (o contrato que a IA lê) |
| `AGENTS.md` | As regras do projeto (a IA lê sempre) |
| `skills/seguranca-api/SKILL.md` | Checklist de segurança pra revisar rotas |
| `minha-api/` | O esqueleto da parte 1, com o prompt e os testes |
| `exercicio.js` e `exercicio.test.js` | A API com 4 bugs e os testes que mostram os bugs |
| `solucao.js` | A mesma API consertada (não abra antes de tentar) |
| `demo.mjs` | Os 4 ataques, rodando sem curl |

## Login de mentira

No `exercicio.js` não tem login de verdade: quem diz qual é o usuário é o header `x-user-id`, e a gente usa os usuários `1` e `2`. Sem esse header a API responde 401. Numa API real o usuário viria de um token validado no servidor.

## Deu problema?

**`fetch failed` no demo.** A API não está rodando: rode `npm run dev` em outro terminal antes.

**Porta 3000 ocupada** (`EADDRINUSE`). Feche o outro terminal que está com um `dev` aberto.

**No seu computador, Node antigo.** Se `node -v` for menor que 20, os testes podem dar `bad option: --test` ou travar. Instale o Node 20 ou 22 LTS em https://nodejs.org, ou use o link do StackBlitz.
