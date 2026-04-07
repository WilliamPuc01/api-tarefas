# API de Tarefas

API REST completa desenvolvida com Node.js, Express, TypeScript e Prisma.

## Tecnologias

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (autenticação)
- Bcrypt (criptografia de senha)

## Funcionalidades

- CRUD completo de tarefas
- Registro e login de usuários
- Rotas protegidas com JWT
- Banco de dados na nuvem

## Rotas

### Auth
- POST `/auth/register` — cadastrar usuário
- POST `/auth/login` — fazer login e receber token

### Tarefas (requer token)
- GET `/tarefas` — listar tarefas
- GET `/tarefas/:id` — buscar tarefa
- POST `/tarefas` — criar tarefa
- PUT `/tarefas/:id` — atualizar tarefa
- DELETE `/tarefas/:id` — deletar tarefa

## Como rodar

```bash
npm install
npm run dev
```
