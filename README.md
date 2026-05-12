# 📝 Todo App — Fullstack

Aplicação fullstack de gerenciamento de tarefas (To-Do List) desenvolvida com Node.js, React e PostgreSQL.

## 🚀 Tecnologias

**Backend**

- Node.js + Express
- Prisma ORM (v7)
- PostgreSQL

**Frontend**

- React + Vite
- Tailwind CSS

## 📋 Funcionalidades

- ✅ Criar tarefas com título e descrição opcional
- ✅ Listar todas as tarefas
- ✅ Buscar tarefa por ID
- ✅ Atualizar tarefa (título, descrição e status)
- ✅ Marcar tarefa como concluída / reabrir
- ✅ Excluir tarefa
- ✅ Filtrar tarefas por status (todas, pendentes, concluídas)
- ✅ Documentação interativa da API (Swagger)

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL instalado e rodando

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/todo-app.git
cd todo-app
```

### 2. Configure o backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` com base no `.env.example`:

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/todoapp"
PORT=3333
```

Execute as migrations:

```bash
npx prisma migrate deploy
```

Suba o servidor:

```bash
npm run dev
```

O backend estará disponível em `http://localhost:3333`  
A documentação da API estará em `http://localhost:3333/docs`

### 3. Configure o frontend

```bash
cd ../frontend
npm install
```

Crie o arquivo `.env`:

```bash
VITE_API_URL=http://localhost:3333
```

Suba o frontend:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📡 Endpoints da API

| Método | Rota       | Descrição              |
| ------ | ---------- | ---------------------- |
| GET    | /tasks     | Lista todas as tarefas |
| GET    | /tasks/:id | Busca tarefa por ID    |
| POST   | /tasks     | Cria uma nova tarefa   |
| PATCH  | /tasks/:id | Atualiza uma tarefa    |
| DELETE | /tasks/:id | Remove uma tarefa      |

Documentação completa e interativa disponível em `/docs` (Swagger).
