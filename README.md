# oficina-api-ia

Material da oficina de back-end Node.js com IA (spec-driven + segurança).
É uma API de tarefas em Express, montada em 3 etapas, com dados em memória e sem banco.

## Pré-requisitos

- Node 20 ou mais (confira com `node -v`). Testado com Node 20 e 22.
- VSCode, ou outro editor que você goste.

Não precisa de Git, de CLI de IA nem de curl.

## Pegar o código

Escolha uma das duas formas.

**(a) Sem Git:** na página do repositório no GitHub, clique em **Code > Download ZIP**, extraia o arquivo e abra a pasta `oficina-api-ia-main` no VSCode.

**(b) Com Git:**

```bash
git clone https://github.com/feralice/oficina-api-ia.git
cd oficina-api-ia
```

## Primeiros passos

No terminal do VSCode (Terminal > New Terminal), dentro da pasta do projeto:

```bash
npm install
npm run test:1
```

Se aparecer `# pass 7` e `# fail 0`, está tudo certo. Um único `npm install` na raiz serve pras 3 etapas.

## As 3 etapas

| Etapa | Pasta | O que é | Rodar | Testar | Resultado esperado |
|---|---|---|---|---|---|
| 1 | `step-1-crud` | CRUD separado em rota, controller e service | `npm run dev:1` | `npm run test:1` | 7 de 7 passam |
| 2 | `step-2-inseguro` | Já tem usuários, mas com IDOR, mass assignment e erro que vaza detalhes | `npm run dev:2` | `npm run test:2` | **6 falham, de propósito** (4 passam) |
| 3 | `step-3-seguro` | Versão corrigida: confere o dono, valida com Zod e não vaza erro | `npm run dev:3` | `npm run test:3` | 10 de 10 passam |

O `test:2` falhar não é erro seu: é o ponto de partida do exercício.

A API sobe em http://localhost:3000. O `dev` usa `node --watch`, então ao salvar um arquivo o servidor reinicia sozinho. Pra parar, `Ctrl+C`.

### Demo dos ataques

Com o step 2 ou o 3 rodando, abra outro terminal e rode:

```bash
npm run demo
```

O script cria uma tarefa como usuário 1 e tenta 4 ataques: ler e alterar a tarefa como usuário 2, trocar o dono com `{"userId":"2"}` e mandar um JSON quebrado. No step 2 tudo passa (e a resposta mostra o stack trace). No step 3 tudo é barrado.

## Roteiro da oficina (60 min)

| Tempo | Parte |
|---|---|
| 0-15 | Abertura e base: spec, camadas (rota, controller, service) e o step 1 |
| 15-24 | Segurança: API exposta, IDOR, mass assignment e as 5 perguntas |
| 24-46 | Hands-on: ache e conserte os bugs do step 2 ([EXERCICIO.md](EXERCICIO.md)) |
| 46-54 | Correção comentada e step 3 verde |
| 54-60 | Recap |

## As 5 perguntas pra todo código da IA

| Pergunta | Onde olhar |
|---|---|
| Quem pode chamar isso? | Tem login? Tem limite de chamadas? |
| O que entra sem validar? | body, query, params e headers |
| De quem é esse dado? | A rota checa o dono do recurso? |
| Que segredo está no código? | Chave, senha, token |
| O que sai no erro e no log? | Stack trace, senha, token |

## Login de mentira

Nos steps 2 e 3 não tem login de verdade. Quem diz qual é o usuário é o header `x-user-id`, e a gente usa os usuários `1` e `2`. Sem esse header a API responde 401.

Serve só pra demonstrar autorização (quem pode mexer em qual tarefa). Numa API real o usuário viria de um token validado no servidor, nunca de um header que o cliente escolhe.

## Arquivos que a IA lê

- `spec.md`: o que a API deve fazer (o contrato)
- `AGENTS.md`: regras do projeto, valem pra qualquer código gerado
- `skills/seguranca-api/SKILL.md`: checklist de segurança pra revisar rotas

## Deu problema?

**Node antigo.** Rode `node -v`. Se for menor que 20, o `npm run test:*` pode dar `bad option: --test`, travar ou quebrar com `Unexpected character`. Instale o Node 20 ou 22 LTS em https://nodejs.org e abra um terminal novo.

**Porta 3000 ocupada** (`EADDRINUSE`). Suba em outra porta e avise o demo qual é:

```bash
PORT=3100 npm run dev:2
PORT=3100 npm run demo
```

**PowerShell (Windows).** O jeito `PORT=3100 npm run ...` é do bash e não funciona no PowerShell. Use:

```powershell
$env:PORT=3100; npm run dev:2
$env:PORT=3100; npm run demo
```

Se o PowerShell reclamar que `npm.ps1` não pode ser carregado porque scripts estão desabilitados, rode `npm.cmd install` (e `npm.cmd run ...`) no lugar de `npm`, ou troque o terminal do VSCode pra Command Prompt ou Git Bash.

**`npm install` bloqueado pela rede.** Rede de laboratório às vezes barra o registro do npm. Tente o roteador do celular, ou peça pra quem está dando a oficina o zip que já vem com `node_modules`: aí é só extrair e pular o `npm install`.

## Exercício

O passo a passo está em [EXERCICIO.md](EXERCICIO.md): ache e conserte os bugs do step 2 até o `npm run test:2` ficar verde.
