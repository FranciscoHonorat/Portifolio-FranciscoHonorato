# 📚 API de Biblioteca

Uma API REST construída com Node.js para gerenciar autores e livros. Projeto educacional para aprender os conceitos de CRUD com Express e MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-black?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [📋 Pré-requisitos](#-pré-requisitos)
- [🚀 Instalação](#-instalação)
- [📡 Endpoints da API](#-endpoints-da-api)
- [📦 Estrutura do Projeto](#-estrutura-do-projeto)
- [💻 Scripts Disponíveis](#-scripts-disponíveis)
- [📝 Exemplos de Uso](#-exemplos-de-uso)
- [🔧 Configuração do Banco de Dados](#-configuração-do-banco-de-dados)
- [📚 Modelos de Dados](#-modelos-de-dados)
- [🎓 Objetivo do Projeto](#-objetivo-do-projeto)

## ✨ Funcionalidades

### 👨‍✍️ Gerenciamento de Autores

- ✅ **CRUD Completo** (Create, Read, Update, Delete)
- ✅ **Listar todos os autores** com paginação
- ✅ **Buscar autor por ID**
- ✅ **Criar novo autor** com validação
- ✅ **Atualizar dados do autor**
- ✅ **Deletar autor** do banco de dados

### 📖 Gerenciamento de Livros

- ✅ **CRUD Completo** (Create, Read, Update, Delete)
- ✅ **Listar todos os livros** com paginação
- ✅ **Buscar livro por ID**
- ✅ **Buscar livros por editora**
- ✅ **Criar novo livro** com validação
- ✅ **Atualizar dados do livro**
- ✅ **Deletar livro** do banco de dados
- ✅ **Relacionamento com Autores** (referência via ObjectId)

### 🔍 Recursos Avançados

- ✅ Banco de dados **MongoDB NoSQL**
- ✅ **ODM Mongoose** para modelagem robusta
- ✅ **Recarga automática** com Nodemon em desenvolvimento
- ✅ **Variáveis de ambiente** com Dotenv
- ✅ **Estrutura MVC** (Models, Views, Controllers)
- ✅ **Rotas organizadas** por entidade

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | 16+ | Runtime JavaScript |
| **Express.js** | 4.x | Framework web minimalista |
| **MongoDB** | 6.0+ | Banco de dados NoSQL |
| **Mongoose** | 7.x+ | ODM para MongoDB |
| **Nodemon** | Latest | Recarga automática (dev) |
| **Dotenv** | Latest | Gerenciamento de env variables |

### Dependências do Projeto

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "dotenv": "^16.0.3"
}
```

## 📋 Pré-requisitos

### Sistema Operacional

- Windows, macOS ou Linux

### Software Necessário

- **Node.js** v16 ou superior
  - [Download Node.js](https://nodejs.org/)
  - Verifique: `node --version`

- **MongoDB** v6.0 ou superior
  - [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Ou use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (nuvem)
  - Verifique: `mongod --version`

- **npm** v8 ou superior (incluído com Node.js)
  - Verifique: `npm --version`

### Conhecimento Prévio

- Conceitos básicos de JavaScript
- Entendimento de operações CRUD
- Familiaridade com APIs REST

## 🚀 Instalação

### Passo 1: Clone ou acesse o projeto

```bash
cd NODEJS-Criando-uma-api
```

Ou clone do repositório:

```bash
git clone https://github.com/FranciscoHonorat/NODEJS-Criando-uma-api.git
cd NODEJS-Criando-uma-api
```

### Passo 2: Instale as dependências

```bash
npm install
```

Isso instalará:
- Express.js
- Mongoose
- Dotenv
- Nodemon (dev dependency)

### Passo 3: Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Ou crie manualmente:

```
MONGODB_URI=mongodb://localhost:27017/sua-biblioteca
PORT=3000
NODE_ENV=development
```

#### Opções de `MONGODB_URI`:

**Local (padrão):**
```
MONGODB_URI=mongodb://localhost:27017/biblioteca
```

**MongoDB Atlas (nuvem):**
```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/biblioteca
```

**Docker:**
```
MONGODB_URI=mongodb://mongo:27017/biblioteca
```

### Passo 4: Inicie o servidor

```bash
npm run dev
```

**Esperado:**
```
Servidor rodando na porta 3000
Conectado ao banco de dados MongoDB
```

✅ O servidor estará disponível em: **http://localhost:3000**

## 📡 Endpoints da API

### 🏠 Health Check

#### GET `/`

Verifica se a API está funcionando.

**Resposta (200):**

```json
{
  "message": "Bem-vindo à API de Biblioteca!"
}
```

---

### 👨‍✍️ Autores

#### GET `/autores`

Lista todos os autores.

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `page` | number | Página (padrão: 1) |
| `limit` | number | Items por página (padrão: 10) |

**Exemplo:**

```bash
curl http://localhost:3000/autores
```

**Resposta (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "Machado de Assis",
    "nacionalidade": "Brasileira",
    "anoNascimento": 1839
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "nome": "Clarice Lispector",
    "nacionalidade": "Brasileira",
    "anoNascimento": 1920
  }
]
```

---

#### GET `/autores/:id`

Obtém um autor específico por ID.

**Exemplo:**

```bash
curl http://localhost:3000/autores/507f1f77bcf86cd799439011
```

**Resposta (200):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileira",
  "anoNascimento": 1839,
  "createdAt": "2024-03-28T10:00:00.000Z",
  "updatedAt": "2024-03-28T10:00:00.000Z"
}
```

---

#### POST `/autores`

Cria um novo autor.

**Body (JSON):**

```json
{
  "nome": "Cruz e Sousa",
  "nacionalidade": "Brasileira",
  "anoNascimento": 1861
}
```

**Exemplo:**

```bash
curl -X POST http://localhost:3000/autores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Cruz e Sousa",
    "nacionalidade": "Brasileira",
    "anoNascimento": 1861
  }'
```

**Resposta (201):**

```json
{
  "_id": "507f1f77bcf86cd799439013",
  "nome": "Cruz e Sousa",
  "nacionalidade": "Brasileira",
  "anoNascimento": 1861,
  "createdAt": "2024-03-28T10:05:00.000Z",
  "updatedAt": "2024-03-28T10:05:00.000Z"
}
```

---

#### PUT `/autores/:id`

Atualiza um autor.

**Body (JSON):**

```json
{
  "nome": "Tom Jobim",
  "nacionalidade": "Brasileira",
  "anoNascimento": 1927
}
```

**Exemplo:**

```bash
curl -X PUT http://localhost:3000/autores/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Tom Jobim",
    "nacionalidade": "Brasileira",
    "anoNascimento": 1927
  }'
```

**Resposta (200):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "Tom Jobim",
  "nacionalidade": "Brasileira",
  "anoNascimento": 1927,
  "updatedAt": "2024-03-28T10:10:00.000Z"
}
```

---

#### DELETE `/autores/:id`

Deleta um autor.

**Exemplo:**

```bash
curl -X DELETE http://localhost:3000/autores/507f1f77bcf86cd799439011
```

**Resposta (200):**

```json
{
  "message": "Autor removido com sucesso"
}
```

---

### 📖 Livros

#### GET `/livros`

Lista todos os livros.

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `page` | number | Página (padrão: 1) |
| `limit` | number | Items por página (padrão: 10) |

**Exemplo:**

```bash
curl http://localhost:3000/livros
```

**Resposta (200):**

```json
[
  {
    "_id": "607f1f77bcf86cd799439014",
    "titulo": "Dom Casmurro",
    "autores": ["507f1f77bcf86cd799439011"],
    "editora": "Companhia das Letras",
    "anoPublicacao": 1899
  }
]
```

---

#### GET `/livros/:id`

Obtém um livro específico por ID.

**Exemplo:**

```bash
curl http://localhost:3000/livros/607f1f77bcf86cd799439014
```

**Resposta (200):**

```json
{
  "_id": "607f1f77bcf86cd799439014",
  "titulo": "Dom Casmurro",
  "autores": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "nome": "Machado de Assis"
    }
  ],
  "editora": "Companhia das Letras",
  "anoPublicacao": 1899,
  "createdAt": "2024-03-28T10:00:00.000Z"
}
```

---

#### GET `/livros/busca?editora=Companhia`

Busca livros por editora.

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `editora` | string | Nome da editora (busca parcial) |

**Exemplo:**

```bash
curl "http://localhost:3000/livros/busca?editora=Companhia"
```

**Resposta (200):**

```json
[
  {
    "_id": "607f1f77bcf86cd799439014",
    "titulo": "Dom Casmurro",
    "editora": "Companhia das Letras",
    "anoPublicacao": 1899
  },
  {
    "_id": "607f1f77bcf86cd799439015",
    "titulo": "Memórias Póstumas de Brás Cubas",
    "editora": "Companhia das Letras",
    "anoPublicacao": 1881
  }
]
```

---

#### POST `/livros`

Cria um novo livro.

**Body (JSON):**

```json
{
  "titulo": "Quincas Borba",
  "autores": ["507f1f77bcf86cd799439011"],
  "editora": "Intrínseca",
  "anoPublicacao": 1891
}
```

**Exemplo:**

```bash
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Quincas Borba",
    "autores": ["507f1f77bcf86cd799439011"],
    "editora": "Intrínseca",
    "anoPublicacao": 1891
  }'
```

**Resposta (201):**

```json
{
  "_id": "607f1f77bcf86cd799439016",
  "titulo": "Quincas Borba",
  "autores": ["507f1f77bcf86cd799439011"],
  "editora": "Intrínseca",
  "anoPublicacao": 1891,
  "createdAt": "2024-03-28T10:15:00.000Z"
}
```

---

#### PUT `/livros/:id`

Atualiza um livro.

**Body (JSON):**

```json
{
  "titulo": "Quincas Borba - Edição Revisada",
  "editora": "Record",
  "anoPublicacao": 1891
}
```

**Exemplo:**

```bash
curl -X PUT http://localhost:3000/livros/607f1f77bcf86cd799439016 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Quincas Borba - Edição Revisada",
    "editora": "Record"
  }'
```

**Resposta (200):**

```json
{
  "_id": "607f1f77bcf86cd799439016",
  "titulo": "Quincas Borba - Edição Revisada",
  "editora": "Record",
  "updatedAt": "2024-03-28T10:20:00.000Z"
}
```

---

#### DELETE `/livros/:id`

Deleta um livro.

**Exemplo:**

```bash
curl -X DELETE http://localhost:3000/livros/607f1f77bcf86cd799439016
```

**Resposta (200):**

```json
{
  "message": "Livro removido com sucesso"
}
```

---

## 📦 Estrutura do Projeto

```
NODEJS-Criando-uma-api/
├── server.js                 # Arquivo de entrada principal
├── package.json              # Dependências e scripts
├── .env                      # Variáveis de ambiente (criar)
├── .env.example              # Exemplo de variáveis
├── .gitignore
└── src/
    ├── app.js                # Configuração da aplicação Express
    ├── config/
    │   └── dbConnect.js      # Conexão com MongoDB
    ├── controllers/
    │   ├── autoresController.js    # Lógica dos autores
    │   └── livroController.js      # Lógica dos livros
    ├── models/
    │   ├── Autor.js          # Schema e modelo de Autor
    │   └── Livro.js          # Schema e modelo de Livro
    └── routes/
        ├── index.js          # Arquivo principal de rotas
        ├── autoresRoutes.js  # Rotas de autores
        └── livrosRoutes.js   # Rotas de livros
```

### Descrição dos Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `server.js` | Ponto de entrada - inicia o servidor Express |
| `src/app.js` | Configuração principal do Express (middlewares, rotas) |
| `src/config/dbConnect.js` | Conexão com MongoDB usando Mongoose |
| `src/models/Autor.js` | Schema MongoDB para autores |
| `src/models/Livro.js` | Schema MongoDB para livros |
| `src/controllers/autoresController.js` | Lógica CRUD de autores |
| `src/controllers/livroController.js` | Lógica CRUD de livros |
| `src/routes/autoresRoutes.js` | Rotas REST de autores |
| `src/routes/livrosRoutes.js` | Rotas REST de livros |

## 💻 Scripts Disponíveis

```bash
# Inicia o servidor em modo desenvolvimento (com auto-reload via Nodemon)
npm run dev

# Inicia o servidor em modo produção
npm start

# Executar testes (quando configurados)
npm test
```

### Explicação dos Scripts

**`npm run dev`**
- Usa Nodemon para recarregar o servidor automaticamente
- Ideal para desenvolvimento
- Detecta mudanças em arquivos `.js`

**`npm start`**
- Inicia o servidor sem Nodemon
- Modo produção
- Não recarrega automaticamente

## 📝 Exemplos de Uso

### Criar um Autor

```bash
curl -X POST http://localhost:3000/autores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Machado de Assis",
    "nacionalidade": "Brasileira",
    "anoNascimento": 1839
  }'
```

### Listar Todos os Autores

```bash
curl http://localhost:3000/autores
```

### Buscar Autor por ID

```bash
curl http://localhost:3000/autores/507f1f77bcf86cd799439011
```

### Atualizar um Autor

```bash
curl -X PUT http://localhost:3000/autores/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Machado de Assis Atualizado"
  }'
```

### Deletar um Autor

```bash
curl -X DELETE http://localhost:3000/autores/507f1f77bcf86cd799439011
```

---

### Listar Todos os Livros

```bash
curl http://localhost:3000/livros
```

### Buscar Livro por ID

```bash
curl http://localhost:3000/livros/607f1f77bcf86cd799439014
```

### Criar um Livro

```bash
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Dom Casmurro",
    "autores": ["507f1f77bcf86cd799439011"],
    "editora": "Companhia das Letras",
    "anoPublicacao": 1899
  }'
```

### Buscar Livros por Editora

```bash
curl "http://localhost:3000/livros/busca?editora=Companhia"
```

### Atualizar um Livro

```bash
curl -X PUT http://localhost:3000/livros/607f1f77bcf86cd799439014 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Dom Casmurro - Edição Especial",
    "editora": "Nova Editora"
  }'
```

### Deletar um Livro

```bash
curl -X DELETE http://localhost:3000/livros/607f1f77bcf86cd799439014
```

## 🔧 Configuração do Banco de Dados

### MongoDB Local

#### Windows

1. [Download MongoDB Community](https://www.mongodb.com/try/download/community)
2. Execute o instalador .msi
3. Inicie o serviço: `mongod`
4. Configure no `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/biblioteca
   ```

#### macOS

```bash
# Instale com Homebrew
brew install mongodb-community

# Inicie o serviço
brew services start mongodb-community

# Configure no .env
MONGODB_URI=mongodb://localhost:27017/biblioteca
```

#### Linux (Ubuntu)

```bash
# Instale
sudo apt-get install -y mongodb

# Inicie
sudo systemctl start mongodb

# Configure no .env
MONGODB_URI=mongodb://localhost:27017/biblioteca
```

### MongoDB Atlas (Nuvem)

1. [Crie conta em MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster grátis
3. Obtenha a connection string
4. Configure no `.env`:
   ```
   MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/biblioteca
   ```

### Verificação de Conexão

```bash
# Verifique se MongoDB está rodando
mongosh  # ou mongo (versões antigas)

# Você deve ver um prompt como:
# > _
```

## 📚 Modelos de Dados

### Autor

**Schema:**

```javascript
{
  nome: {
    type: String,
    required: true,        // Obrigatório
    minlength: 3,         // Mínimo 3 caracteres
    maxlength: 100        // Máximo 100 caracteres
  },
  nacionalidade: {
    type: String,
    default: "Desconhecida"
  },
  anoNascimento: {
    type: Number,
    min: 1000,           // Mínimo
    max: new Date().getFullYear()  // Máximo (ano atual)
  },
  createdAt: {
    type: Date,
    default: Date.now    // Automático
  },
  updatedAt: {
    type: Date,
    default: Date.now    // Automático
  }
}
```

**Exemplo de documento:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileira",
  "anoNascimento": 1839,
  "createdAt": "2024-03-28T10:00:00.000Z",
  "updatedAt": "2024-03-28T10:00:00.000Z"
}
```

---

### Livro

**Schema:**

```javascript
{
  titulo: {
    type: String,
    required: true,        // Obrigatório
    minlength: 1,
    maxlength: 200
  },
  autores: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Autor",          // Referência a modelo Autor
    required: true
  },
  editora: {
    type: String,
    minlength: 1,
    maxlength: 100
  },
  anoPublicacao: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear()
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Exemplo de documento (com populate):**

```json
{
  "_id": "607f1f77bcf86cd799439014",
  "titulo": "Dom Casmurro",
  "autores": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "nome": "Machado de Assis"
    }
  ],
  "editora": "Companhia das Letras",
  "anoPublicacao": 1899,
  "createdAt": "2024-03-28T10:00:00.000Z"
}
```

## 🎓 Objetivo do Projeto

Este é um **projeto educacional** para aprender:

### Conceitos Aprendidos

- ✅ **Criação de APIs REST** com Express.js
- ✅ **Operações CRUD** completas (Create, Read, Update, Delete)
- ✅ **Integração com MongoDB** e Mongoose ODM
- ✅ **Boas práticas** de organização de código (padrão MVC)
- ✅ **Uso de variáveis de ambiente** com Dotenv
- ✅ **Separação de responsabilidades** (Controllers, Models, Routes)
- ✅ **Relacionamentos** entre entidades (Livro → Autor)
- ✅ **Tratamento de erros** básico
- ✅ **Versionamento** com Git

### Melhorias Sugeridas (Para v2)

- 🔐 Autenticação e autorização (JWT)
- 📝 Validação robusta de inputs (Joi, Yup)
- 🧪 Testes automatizados (Jest, Mocha)
- 📊 Paginação completa
- 🔍 Filtros avançados
- 📚 Documentação Swagger
- 🚀 Deploy (Heroku, Railway, Vercel)
- 💾 Backup automático

## 📄 Licença

ISC License - veja [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📞 Dúvidas ou Sugestões?

- 🐛 Abra uma [issue](https://github.com/FranciscoHonorat/NODEJS-Criando-uma-api/issues)
- 💬 Entre em contato
- ⭐ Se este projeto te ajudou, considere dar uma estrela!

---

**Desenvolvido como projeto de aprendizado de Node.js**

Mantido por: Francisco Honorat  
Última atualização: Março 2026  
Repositório: [GitHub](https://github.com/FranciscoHonorat/NODEJS-Criando-uma-api)

Made with ❤️ for learning Node.js 🚀
