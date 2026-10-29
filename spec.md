# API de tarefas

## Objetivo
Uma API simples pra criar, listar, atualizar e remover tarefas.

## Endpoints
- POST   /tasks      cria uma tarefa (title obrigatório)
- GET    /tasks      lista as tarefas
- GET    /tasks/:id  busca uma tarefa
- PATCH  /tasks/:id  atualiza title e/ou done
- DELETE /tasks/:id  remove

## Regras
- title: texto de 1 a 100 caracteres
- done: verdadeiro ou falso (começa falso)
- o id é gerado pelo servidor

## Erros
- 400 dado inválido
- 404 tarefa não existe

## Fora do escopo
- login de verdade (o usuário vem do header x-user-id)
- banco de dados (tudo em memória)

## Aceite
- POST sem title retorna 400
- title com mais de 100 caracteres retorna 400
- (step 2 e 3) uma pessoa não acessa a tarefa de outra
