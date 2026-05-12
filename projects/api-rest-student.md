# 🎓 API REST - Student Management API

API REST completa para gerenciamento de estudantes, cursos e matrículas, construída com Node.js, TypeScript, Prisma e Express.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🏗️ Arquitetura](#️-arquitetura)
- [🚀 Como Rodar](#-como-rodar)
- [📖 Documentação da API](#-documentação-da-api)
- [🔒 Segurança](#-segurança)
- [🧪 Testes](#-testes)
- [📦 Estrutura do Projeto](#-estrutura-do-projeto)
- [🛠️ Tecnologias](#️-tecnologias)
- [🤝 Contribuindo](#-contribuindo)
- [📝 Licença](#-licença)

## ✨ Funcionalidades

### 📚 Gerenciamento de Estudantes

- ✅ **CRUD completo** (Create, Read, Update, Delete)
- ✅ **Paginação, filtros e ordenação**
- ✅ **Validação robusta de dados** (Zod)
- ✅ **Emails únicos** (sem duplicatas)

### 🎯 Gerenciamento de Cursos

- ✅ **CRUD completo** de cursos
- ✅ **Filtros por nome, instrutor e duração**
- ✅ **Relacionamento com matrículas**
- ✅ **Validação de dados de entrada**

### 📝 Gerenciamento de Matrículas

- ✅ **Matricular estudante em curso**
- ✅ **Status de matrícula** (active, completed, cancelled)
- ✅ **Validação de duplicatas** (mesmo estudante + curso)
- ✅ **Consultas por estudante ou curso**
- ✅ **Deleção em cascata** (curso deletado → matrículas removidas)

### 🔒 Segurança

- ✅ **Rate Limiting** (100 req/15min geral, 10 req/15min escrita)
- ✅ **Helmet** (headers de segurança)
- ✅ **CORS** configurável
- ✅ **Validação** de entrada em todas as rotas
- ✅ **Logs estruturados** (Winston)

### 📊 Recursos Avançados

- ✅ **Paginação configurável** (padrão: 10 items/página, máx: 100)
- ✅ **Filtros múltiplos** e busca parcial
- ✅ **Ordenação** por qualquer campo
- ✅ **Error handling** centralizado
- ✅ **Documentação interativa** (Swagger)

## 🏗️ Arquitetura

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│       Express Middlewares       │
│  ┌───────────────────────────┐  │
│  │ Rate Limiter (Security)   │  │
│  │ Request Logger (Logging)  │  │
│  │ CORS & Helmet (Security)  │  │
│  └───────────────────────────┘  │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│          Routes Layer           │
│  ┌───────────────────────────┐  │
│  │ Validation Middlewares    │  │
│  │ - Query Params (Zod)      │  │
│  │ - Path Params (Zod)       │  │
│  │ - Body Data (Zod)         │  │
│  └───────────────────────────┘  │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│      Controllers Layer          │
│  ┌───────────────────────────┐  │
│  │ Request/Response Handling │  │
│  │ Error Propagation         │  │
│  └───────────────────────────┘  │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│       Services Layer            │
│  ┌───────────────────────────┐  │
│  │ Business Logic            │  │
│  │ Validation                │  │
│  │ Data Transformation       │  │
│  └───────────────────────────┘  │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│     Repositories Layer          │
│  ┌───────────────────────────┐  │
│  │ Database Operations       │  │
│  │ Prisma Queries            │  │
│  └───────────────────────────┘  │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│      SQLite Database            │
└─────────────────────────────────┘
```

### Padrão Arquitetural: Layered Architecture (Clean Architecture)

- **Routes:** Define endpoints e middlewares
- **Controllers:** Lida com HTTP requests/responses
- **Services:** Contém lógica de negócio
- **Repositories:** Acessa banco de dados
- **Middlewares:** Validação, logging, segurança

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 20.x ou superior
- npm ou yarn
- SQLite (já incluído)

### Instalação

```bash
# 1. Clonar repositório
git clone https://github.com/FranciscoHonorat/API-REST.git
cd API-REST

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# 4. Executar migrations do banco
npx prisma migrate dev

# 5. (Opcional) Popular banco com dados de teste
npm run seed
```

### Executar

```bash
# Modo desenvolvimento (hot reload)
npm run dev

# Modo produção
npm run build
npm start
```

A API estará rodando em: **http://localhost:3000**

### Scripts Disponíveis

```bash
npm run dev              # Executar em desenvolvimento
npm run build            # Compilar TypeScript
npm start                # Executar build de produção
npm run lint             # Verificar código (ESLint)
npm run format           # Formatar código (Prettier)
npm test                 # Executar testes
npm run test:watch       # Testes em modo watch
npm run test:cov         # Testes com coverage
npm run seed             # Popular banco com dados de teste
```

## 📖 Documentação da API

### Swagger UI (Interativo)

Após iniciar o servidor, acesse:

```
http://localhost:3000/api-docs
```

Interface interativa onde você pode:

- 📖 Ver todos os endpoints
- 🧪 Testar endpoints diretamente no navegador
- 📝 Ver schemas de request/response
- 📚 Consultar exemplos de uso

### OpenAPI JSON

Especificação em formato JSON:

```
http://localhost:3000/api-docs.json
```

### Endpoints Principais

#### Health Check

```
GET /health
```

#### Estudantes

```
GET    /students           # Listar (paginado)
GET    /students/:id       # Buscar por ID
POST   /students           # Criar
PATCH  /students/:id       # Atualizar
DELETE /students/:id       # Deletar
```

#### Cursos

```
GET    /courses            # Listar (paginado)
GET    /courses/:id        # Buscar por ID
POST   /courses            # Criar
PATCH  /courses/:id        # Atualizar
DELETE /courses/:id        # Deletar
```

#### Matrículas

```
GET    /enrollments               # Listar (paginado)
GET    /enrollments/:id           # Buscar por ID
GET    /enrollments/student/:id   # Por estudante
GET    /enrollments/course/:id    # Por curso
POST   /enrollments               # Criar
PATCH  /enrollments/:id           # Atualizar
DELETE /enrollments/:id           # Deletar
```

### Exemplos de Uso

#### Criar Estudante

```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11987654321"
  }'
```

**Resposta (201):**

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11987654321",
  "createdAt": "2024-03-28T10:00:00Z",
  "updatedAt": "2024-03-28T10:00:00Z"
}
```

#### Listar Estudantes com Filtros

```bash
# Paginação + filtro + ordenação
curl "http://localhost:3000/students?page=1&limit=10&name=joão&sortBy=name&order=asc"
```

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `page` | number | Página (padrão: 1) |
| `limit` | number | Items por página (padrão: 10, máx: 100) |
| `name` | string | Filtro por nome |
| `email` | string | Filtro por email |
| `sortBy` | string | Campo para ordenação |
| `order` | string | `asc` ou `desc` |

#### Criar Matrícula

```bash
curl -X POST http://localhost:3000/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "courseId": 1,
    "status": "active"
  }'
```

**Resposta (201):**

```json
{
  "id": 1,
  "studentId": 1,
  "courseId": 1,
  "status": "active",
  "enrollmentDate": "2024-03-28T10:00:00Z",
  "completionDate": null
}
```

## 🔒 Segurança

### Rate Limiting

| Tipo de Operação | Limite | Janela de Tempo |
|------------------|--------|-----------------|
| Leitura (GET) | 100 requisições | 15 minutos |
| Escrita (POST/PATCH/DELETE) | 10 requisições | 15 minutos |

### Headers de Segurança (Helmet)

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 0`
- Content Security Policy configurado

### CORS

```bash
# Configurável via .env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Validação de Entrada

Todas as rotas validam dados usando **Zod**:

- Query params (paginação, filtros)
- Path params (IDs)
- Request body (dados enviados)

### Boas Práticas Implementadas

- ✅ Senhas criptografadas (bcryptjs)
- ✅ Validação em múltiplas camadas
- ✅ Sanitização de inputs
- ✅ Logs de auditoria
- ✅ Tratamento centralizado de erros

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes com coverage
npm run test:cov

# Testes em modo watch
npm run test:watch
```

### Cobertura de Testes

- ✅ Testes unitários (Services)
- ✅ Testes de integração (API endpoints)
- ✅ Testes de validação (Schemas Zod)
- ✅ Testes de error handling

## 📦 Estrutura do Projeto

```
API-REST/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── migrations/            # Migrations do Prisma
│   └── dev.db                 # Banco SQLite (dev)
├── src/
│   ├── config/
│   │   ├── env.ts            # Variáveis de ambiente
│   │   └── swagger.ts        # Configuração Swagger
│   ├── controllers/          # Controllers (HTTP handlers)
│   │   ├── studentController.ts
│   │   ├── courseController.ts
│   │   └── enrollmentController.ts
│   ├── services/             # Lógica de negócio
│   │   ├── studentService.ts
│   │   ├── courseService.ts
│   │   └── enrollmentService.ts
│   ├── repositories/         # Acesso ao banco (Prisma)
│   │   ├── studentRepository.ts
│   │   ├── courseRepository.ts
│   │   └── enrollmentRepository.ts
│   ├── routes/               # Definição de rotas
│   │   ├── studentRouter.ts
│   │   ├── courseRouter.ts
│   │   ├── enrollmentRouter.ts
│   │   └── healthRouter.ts
│   ├── middlewares/          # Middlewares Express
│   │   ├── validator.ts
│   │   ├── validateQuery.ts
│   │   ├── validateParams.ts
│   │   ├── rateLimiter.ts
│   │   ├── requestLogger.ts
│   │   ├── errorHandler.ts
│   │   └── notFoundHandler.ts
│   ├── types/                # Types TypeScript e Schemas Zod
│   │   ├── student.ts
│   │   ├── course.ts
│   │   ├── enrollment.ts
│   │   ├── pagination.ts
│   │   ├── filters.ts
│   │   ├── sorting.ts
│   │   ├── queryParams.ts
│   │   └── errorHandler.ts
│   ├── lib/                  # Utilitários
│   │   ├── prisma.ts         # Cliente Prisma
│   │   └── logger.ts         # Winston Logger
│   ├── app.ts                # Configuração Express
│   └── server.ts             # Entry point
├── tests/                    # Testes automatizados
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── logs/                     # Logs da aplicação
│   ├── error.log
│   └── combined.log
├── .env                      # Variáveis de ambiente
├── .env.example              # Exemplo de .env
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
├── ROADMAP.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── LICENSE
```

## 🛠️ Tecnologias

### Core

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express** - Framework web minimalista

### Banco de Dados

- **Prisma** - ORM moderno para Node.js
- **SQLite** - Banco de dados embarcado (desenvolvimento)

### Validação

- **Zod** - Schema validation com TypeScript

### Segurança

- **Helmet** - Headers de segurança
- **CORS** - Cross-Origin Resource Sharing
- **express-rate-limit** - Rate limiting

### Logging

- **Winston** - Logger profissional estruturado

### Documentação

- **Swagger UI Express** - Interface Swagger
- **swagger-jsdoc** - Gerar OpenAPI a partir de JSDoc

### Dev Tools

- **ts-node-dev** - Hot reload TypeScript
- **ESLint** - Linter JavaScript/TypeScript
- **Prettier** - Code formatter

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia `CONTRIBUTING.md` para detalhes sobre nosso código de conduta e processo de submissão de pull requests.

### Como Contribuir

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo `LICENSE` para detalhes.

---

### 👤 Autor

**Francisco Honorat**

- GitHub: [@FranciscoHonorat](https://github.com/FranciscoHonorat)
- LinkedIn: [Francisco Honorat](https://linkedin.com/in/francisco-honorat)

### 🙏 Agradecimentos

- Inspirado em melhores práticas de arquitetura de software
- Comunidade Node.js e TypeScript
- Todos os contribuidores do projeto

---

### 📊 Status do Projeto

🚀 **Em desenvolvimento ativo** - v1.0.0

Veja `ROADMAP.md` para funcionalidades planejadas.

### 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

- 🐛 Abra uma [issue](https://github.com/FranciscoHonorat/API-REST/issues)
- 💬 Entre em contato via [discussões](https://github.com/FranciscoHonorat/API-REST/discussions)
- ⭐ Se este projeto te ajudou, considere dar uma estrela!

---

**Made with ❤️ by Francisco Honorat**

Última atualização: Março 2026  
Repositório: [GitHub](https://github.com/FranciscoHonorat/API-REST)
