# 📚 Sistema de Cadastros de Livros - Biblioteca IFPB

API RESTful para gerenciamento de livros, usuários, empréstimos e multas da Biblioteca do IFPB.

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [🛠️ Tecnologias](#️-tecnologias)
- [📋 Pré-requisitos](#-pré-requisitos)
- [💾 Instalação](#-instalação)
- [🚀 Executando o Servidor](#-executando-o-servidor)
- [⚙️ Variáveis de Ambiente](#️-variáveis-de-ambiente)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔌 Endpoints da API](#-endpoints-da-api)
- [🔐 Autenticação](#-autenticação)
- [📖 Documentação Swagger](#-documentação-swagger)
- [📝 Regras de Negócio](#-regras-de-negócio)

## Sobre o Projeto

Sistema de gerenciamento de biblioteca para o IFPB. Permite que alunos façam login, consultem o acervo e realizem empréstimos de livros. Administradores podem cadastrar, atualizar e remover livros, além de gerenciar usuários e acompanhar empréstimos e multas por atraso.

### Funcionalidades Principais

- 👥 **Autenticação e Autorização** - Sistema JWT com diferentes permissões por role
- 📚 **Gerenciamento de Livros** - CRUD completo com filtros e categorias
- 👤 **Gerenciamento de Usuários** - Perfis, com e sem privilégios admin
- 📋 **Controle de Empréstimos** - Registro de empréstimos, devoluções e acompanhamento
- 💰 **Sistema de Multas** - Cálculo automático de multas por atraso
- 📊 **Estatísticas** - Dashboard com informações do acervo
- 📖 **Documentação Swagger** - API interativa auto-documentada

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| **Back-end** | Node.js, Express 5 |
| **Banco de dados** | SQLite (via Sequelize ORM) |
| **Autenticação** | JWT (jsonwebtoken) + bcryptjs |
| **Documentação** | Swagger (swagger-jsdoc + swagger-ui-express) |
| **Utilitários** | nodemon (dev) |

## 📋 Pré-requisitos

- Node.js v18 ou superior
- npm v9 ou superior

## 💾 Instalação

```bash
# Clone o repositório
git clone https://github.com/FranciscoHonorat/Sistema-de-cadastros-de-livros.git

# Entre na pasta do projeto
cd Sistema-de-cadastros-de-livros/biblioteca-ifpb-api

# Instale as dependências
npm install
```

## 🚀 Executando o Servidor

```bash
# Modo desenvolvimento (com hot-reload via nodemon)
npm run dev

# Modo produção
node server.js
```

O servidor será iniciado em `http://localhost:3000`.

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz de `biblioteca-ifpb-api/` com as seguintes variáveis (opcional — o projeto usa valores padrão quando não definidas):

```
PORT=3000
JWT_SECRET=sua_chave_secreta
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=biblioteca_ifpb
DB_DIALECT=sqlite
```

## 📁 Estrutura do Projeto

```
biblioteca-ifpb-api/
├── public/                  # Arquivos estáticos (front-end)
├── src/
│   ├── app.js              # Configuração da aplicação Express
│   ├── controllers/         # Lógica dos endpoints
│   │   ├── AdminController.js
│   │   ├── AuthController.js
│   │   ├── BookController.js
│   │   └── LoanController.js
│   ├── database/
│   │   ├── config/          # Configuração do Sequelize
│   │   ├── migrations/      # Scripts de migração
│   │   ├── models/          # Modelos: Book, User, Loan, Fine
│   │   └── seeders/         # Dados iniciais
│   ├── middleware/
│   │   ├── auth.js          # Verificação de token JWT e permissões
│   │   └── errorHandler.js  # Tratamento centralizado de erros
│   ├── routes/
│   │   ├── index.js         # Roteamento principal
│   │   ├── authRoute.js     # Rotas de autenticação
│   │   ├── bookRoute.js     # Rotas de livros
│   │   ├── loansRoute.js    # Rotas de empréstimos
│   │   └── adminRoute.js    # Rotas administrativas
│   ├── services/            # Lógica de negócio
│   └── utils/               # Funções auxiliares
└── server.js                # Ponto de entrada da aplicação
```

## 🔌 Endpoints da API

**URL Base:** `http://localhost:3000/api`

### 🔐 Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/login` | Realizar login | Não |
| POST | `/auth/reset-password` | Solicitar reset de senha | Não |

#### Exemplo — Login:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@email.com",
    "role": "student"
  }
}
```

### 👥 Usuários / Perfil

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/admin/register` | Cadastrar novo usuário | Não |
| GET | `/admin/profile/:id` | Obter perfil do usuário | Sim |
| PUT | `/admin/profile/:id` | Atualizar perfil do usuário | Sim |
| GET | `/admin/users` | Listar todos os usuários | Admin |

#### Exemplo — Registrar usuário:

```http
POST /api/admin/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "role": "student"
}
```

**Resposta (201):**

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "student",
  "createdAt": "2026-03-28T10:00:00Z"
}
```

### 📚 Livros

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/books` | Listar todos os livros (com filtros) | Não |
| GET | `/books/available` | Listar livros disponíveis | Não |
| GET | `/books/category/:category` | Listar livros por categoria | Não |
| GET | `/books/stats` | Estatísticas do acervo | Admin |
| GET | `/books/:id` | Buscar livro por ID | Não |
| POST | `/books` | Cadastrar novo livro | Admin |
| PUT | `/books/:id` | Atualizar livro | Admin |
| PATCH | `/books/:id/status` | Atualizar status do livro | Sim |
| DELETE | `/books/:id` | Remover livro | Admin |

#### Filtros disponíveis em `GET /books`:

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `title` | string | Filtrar por título |
| `author` | string | Filtrar por autor |
| `category` | string | Filtrar por categoria |
| `status` | string | Filtrar por status |

**Status válidos:** `Disponível`, `Emprestado`, `Reservado`, `Indisponível`

#### Exemplo — Cadastrar livro (admin):

```http
POST /api/books
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publisher": "Alta Books",
  "category": "Engenharia de Software",
  "version": 1.0
}
```

**Resposta (201):**

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publisher": "Alta Books",
  "category": "Engenharia de Software",
  "status": "Disponível",
  "createdAt": "2026-03-28T10:00:00Z"
}
```

#### Exemplo — Atualizar status do livro:

```http
PATCH /api/books/1/status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "status": "Emprestado"
}
```

**Opções de status:** `Disponível`, `Emprestado`, `Reservado`, `Indisponível`

### 📋 Empréstimos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/loans` | Criar novo empréstimo | Sim |
| GET | `/loans` | Listar empréstimos do usuário | Sim |
| PATCH | `/loans/:id/return` | Registrar devolução do livro | Sim |
| GET | `/loans/admin/all` | Listar todos os empréstimos (paginado) | Admin |
| GET | `/loans/admin/overdue` | Listar empréstimos em atraso | Admin |

#### Exemplo — Criar empréstimo:

```http
POST /api/loans
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "bookId": 1,
  "loanPeriodDays": 30
}
```

**Resposta (201):**

```json
{
  "id": 1,
  "userId": 1,
  "bookId": 1,
  "loanDate": "2026-03-28T10:00:00Z",
  "dueDate": "2026-04-27T10:00:00Z",
  "status": "Active",
  "returnDate": null
}
```

#### Filtros disponíveis em `GET /loans`:

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `status` | string | `Active`, `Overdue`, `Returned` |

#### Exemplo — Registrar devolução:

```http
PATCH /api/loans/1/return
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{}
```

**Resposta (200):**

```json
{
  "id": 1,
  "userId": 1,
  "bookId": 1,
  "status": "Returned",
  "returnDate": "2026-03-28T15:00:00Z",
  "fine": null
}
```

## 🔐 Autenticação

### JWT (JSON Web Token)

Endpoints protegidos exigem o token JWT no cabeçalho da requisição:

```
Authorization: Bearer <seu_token>
```

O token é obtido no endpoint `POST /api/auth/login`.

#### Exemplo com fetch:

```javascript
const response = await fetch('http://localhost:3000/api/books', {
  headers: {
    'Authorization': 'Bearer SEU_TOKEN_AQUI'
  }
});
const livros = await response.json();
console.log(livros);
```

#### Ciclo de vida do token

1. Login: usuário fornece email e senha
2. Servidor gera JWT com expiração de 24h
3. Cliente armazena o token
4. Cliente envia token em cada requisição
5. Servidor valida o token e autoriza a ação

#### Permissões por Role

| Role | Permissões |
|------|-----------|
| **student** | Consultar livros, fazer empréstimos, ver empréstimos próprios |
| **librarian** | Todas as permissões de student + gerenciar livros |
| **admin** | Gerenciamento completo (usuários, livros, empréstimos, multas) |

## 📖 Documentação Swagger

A documentação interativa da API está disponível em:

```
http://localhost:3000/api-docs
```

Acesse este endereço em seu navegador para:

- 🔍 Explorar todos os endpoints
- 📝 Ver schemas de request/response
- 🧪 Testar endpoints diretamente (com autenticação)
- 📥 Downloads de especificação OpenAPI

## 📝 Regras de Negócio

### Empréstimos

- O prazo de devolução é configurável
- **Prazos oferecidos:** 30 dias (padrão) ou 90 dias
- Cada usuário pode ter múltiplos empréstimos simultâneos
- Um livro só pode ser emprestado se seu status for `Disponível`

### Multas

- Após o vencimento do prazo, é gerada automaticamente uma multa
- **Valor da multa:** R$ 0,50 por dia de atraso
- A multa é calculada automaticamente ao consultar empréstimos em atraso
- O usuário pode visualizar multas pendentes em seu perfil

### Livros

- Apenas administradores podem cadastrar, editar e remover livros
- Cada livro tem um status que controla sua disponibilidade
- Livros podem ser filtrados por título, autor, categoria e status
- Estatísticas do acervo (total, disponível, emprestado) estão disponíveis para admin

### Usuários

- O cadastro de novos usuários é aberto (qualquer pessoa pode se registrar)
- O gerenciamento completo da lista de usuários é restrito a administradores
- Cada usuário tem um perfil que pode ser atualizado (nome, email, etc.)
- Senhas são criptografadas com bcryptjs (nunca armazenadas em claro)

### Segurança

- Todas as senhas são hasheadas com bcryptjs
- Tokens JWT expiram em 24h
- Endpoints sensíveis requerem autenticação
- Operações de admin requerem role específico
- Usuários normais só podem acessar seus próprios dados

---

**Mantido por:** Francisco Honorat  
**Última atualização:** Março 2026  
**Repositório:** [GitHub](https://github.com/FranciscoHonorat/Sistema-de-cadastros-de-livros)
