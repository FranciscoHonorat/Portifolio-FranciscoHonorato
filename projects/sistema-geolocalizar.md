# 🗺️ Sistema de Geolocalização e Rotas

API REST com interface web para geolocalização, busca de endereços e cálculo de rotas otimizadas, integrando OpenStreetMap (Nominatim + OSRM).

## 📋 Funcionalidades

- 🔍 **Busca de endereço por CEP ou texto** — Geocodificação via Nominatim (OpenStreetMap)
- 🛣️ **Cálculo de rotas otimizadas** — Distância e duração via OSRM (OpenStreetMap Routing Machine)
- 🗺️ **Mapa interativo** — Visualização de marcadores e rotas com Leaflet no frontend React
- 📝 **Histórico de consultas** — Registro das buscas e rotas calculadas na sessão
- ⚡ **Cache de resultados** — Armazenamento em memória (padrão) ou Redis para melhor performance
- 🛡️ **Rate limiting** — Proteção contra abuso de requisições
- 🌐 **CORS configurável** — Suporte a múltiplas origens

## 🛠️ Tecnologias

### Backend

| Tecnologia | Descrição |
|-----------|-----------|
| Node.js | Runtime JavaScript |
| Express | Framework HTTP |
| TypeScript | Superset tipado do JavaScript |
| Axios | Cliente HTTP para APIs externas |
| Zod | Validação de schemas |
| ioredis | Cliente Redis (opcional) |

### Frontend

| Tecnologia | Descrição |
|-----------|-----------|
| React 18 | Biblioteca de UI |
| TypeScript | Tipagem estática |
| Leaflet + react-leaflet | Mapas interativos |
| Vite | Bundler e servidor de desenvolvimento |

### APIs Externas

| API | Uso |
|-----|-----|
| Nominatim (OSM) | Geocodificação (endereço → coordenadas) |
| OSRM | Roteamento (origem → destino) |

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** com separação em camadas:

```
src/
├── domain/                          # Camada de Domínio
│   ├── entities/                    # Entidades (ex.: Rota)
│   ├── interfaces/                  # Contratos do domínio
│   ├── services/                    # Serviços de domínio (ex.: HaversineDistanceCalculator)
│   └── value-objects/               # Objetos de valor (ex.: Coordenada)
│
├── application/                     # Camada de Aplicação
│   ├── dtos/                        # Objetos de transferência de dados
│   ├── interfaces/                  # Contratos de repositórios e casos de uso
│   ├── services/                    # Serviços de aplicação
│   └── use-cases/                   # Casos de uso
│       ├── BuscarEnderecoUseCase
│       └── CalcularRotaUseCase
│
├── infrastructure/                  # Camada de Infraestrutura
│   ├── cache/                       # Implementações de cache (Memory, Redis)
│   ├── database/                    # Repositórios em memória
│   └── external-apis/               # Provedores externos (OpenStreetMap, ViaCEP, Google Maps)
│
└── presentation/                    # Camada de Apresentação
    ├── controllers/                 # Controllers Express
    ├── middlewares/                 # Middlewares (CORS, rate limit, logs, validação)
    └── routes/                      # Definição de rotas

src-frontend/                        # Frontend React
├── components/                      # Componentes (Mapa, BuscarEndereco, CalcularRota, Historico)
├── services/                        # Serviço de comunicação com a API
└── styles/                          # Estilos CSS
```

## ⚙️ Pré-requisitos

- Node.js >= 18
- npm >= 9
- (Opcional) Redis para cache persistente

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/FranciscoHonorat/Sistema-de-Geolocaliza--o-e-Rotas-main.git
cd Sistema-de-Geolocaliza--o-e-Rotas-main/Sistema-de-Geolocaliza--o-e-Rotas-main

# Instale as dependências
npm install
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Edite o `.env` conforme necessário:

```env
PORT=3000
NODE_ENV=development

# Cache (opcional - Redis)
REDIS_URL=redis://localhost:6379

# Logs
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:5173
```

**Nota:** O Redis é opcional. Por padrão, o cache é armazenado em memória.

## ▶️ Executando

### Desenvolvimento (backend + frontend simultaneamente)

```bash
npm run dev
```

- **Backend API:** http://localhost:3000/api
- **Frontend (Vite HMR):** http://localhost:5173

### Apenas o backend

```bash
npm run dev:backend
```

### Apenas o frontend

```bash
npm run dev:frontend
```

### Produção

```bash
# Compilar backend e frontend
npm run build

# Iniciar servidor (serve o frontend compilado)
npm start
```

Após o build, acesse: http://localhost:3000

## 📡 Endpoints da API

### Health Check

#### `GET /health`

Verifica se o servidor está em funcionamento.

**Resposta (200):**

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45
}
```

### Busca de Endereço

#### `GET /api/endereco`

Busca as coordenadas geográficas de um endereço.

**Query params:**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-----------|-----------|
| `cep` | string | Condicional* | CEP brasileiro (ex.: 01310-100) |
| `endereco` | string | Condicional* | Texto do endereço (ex.: Av. Paulista, São Paulo) |

*Pelo menos um dos parâmetros é obrigatório.*

**Exemplo de requisição:**

```http
GET /api/endereco?endereco=Av. Paulista, São Paulo
```

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "data": {
    "coordenadas": {
      "latitude": -23.5646162,
      "longitude": -46.6522451
    },
    "endereco": "Avenida Paulista, Bela Vista, São Paulo, SP, Brasil"
  }
}
```

**Resposta de erro (422 - Validação):**

```json
{
  "success": false,
  "error": "CEP ou endereço é obrigatório"
}
```

### Cálculo de Rotas

#### `POST /api/rota`

Calcula a rota entre dois pontos.

**Body (JSON):**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-----------|-----------|
| `origem` | object | ✅ | Coordenadas de origem `{ latitude, longitude }` |
| `destino` | object | ✅ | Coordenadas de destino `{ latitude, longitude }` |
| `modoViagem` | string | ❌ | Modo de viagem: `driving` (padrão), `walking`, `bicycling` |

**Exemplo de requisição:**

```bash
curl -X POST http://localhost:3000/api/rota \
  -H "Content-Type: application/json" \
  -d '{
    "origem": { "latitude": -23.5505, "longitude": -46.6333 },
    "destino": { "latitude": -23.5646, "longitude": -46.6522 },
    "modoViagem": "driving"
  }'
```

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "data": {
    "origem": {
      "latitude": -23.5505,
      "longitude": -46.6333
    },
    "destino": {
      "latitude": -23.5646,
      "longitude": -46.6522
    },
    "distancia": 2.37,
    "duracao": 8.5,
    "passos": [
      {
        "distancia": 150,
        "duracao": 30,
        "instrucao": "Vire à direita"
      },
      {
        "distancia": 200,
        "duracao": 45,
        "instrucao": "Continue reto"
      }
    ]
  }
}
```

**Resposta de erro (400):**

```json
{
  "success": false,
  "error": "Coordenadas de origem e destino são obrigatórias"
}
```

## 🗄️ Estratégias de Cache

O sistema suporta duas estratégias de cache:

| Estratégia | Configuração | Descrição |
|-----------|------------|-----------|
| **Memória (padrão)** | Sem configuração adicional | Cache in-process, perdido ao reiniciar |
| **Redis** | Defina `REDIS_URL` no `.env` | Cache persistente e compartilhado entre instâncias |

### Exemplo de configuração Redis

```env
REDIS_URL=redis://localhost:6379
```

O sistema automaticamente usa Redis se a variável estiver configurada, caso contrário usa memória.

## 📐 Cálculo de Distância

A distância entre dois pontos é calculada pelo serviço **HaversineDistanceCalculator**, que usa a **Fórmula de Haversine** para obter a distância geodésica (em linha reta) entre duas coordenadas geográficas na superfície terrestre.

### Fórmula:

```
a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)
c = 2 * atan2(√a, √(1−a))
d = R * c
```

Onde:
- `R` = raio da Terra (~6.371 km)
- `lat1, lon1` = coordenadas do ponto 1
- `lat2, lon2` = coordenadas do ponto 2

## 📁 Estrutura de Arquivos Principal

```
.
├── server.ts                  # Ponto de entrada do servidor Express
├── package.json
├── tsconfig.json              # Configuração TypeScript (backend)
├── tsconfig.frontend.json     # Configuração TypeScript (frontend)
├── vite.config.ts             # Configuração Vite
├── .env.example               # Exemplo de variáveis de ambiente
├── src/                       # Código-fonte do backend
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   └── presentation/
└── src-frontend/              # Código-fonte do frontend
    ├── components/
    ├── services/
    └── styles/
```

## 🔒 Segurança

### Rate Limiting

O sistema implementa rate limiting para proteger a API contra abuso:

- **Janela padrão:** 15 minutos (900.000 ms)
- **Limite padrão:** 100 requisições por janela
- **Configurável via `.env`**: `RATE_LIMIT_WINDOW_MS` e `RATE_LIMIT_MAX_REQUESTS`

### CORS

- Configurável para suportar múltiplas origens
- Por padrão, aceita `http://localhost:5173` em desenvolvimento
- Configure via `.env` com `CORS_ORIGIN`

### Validação

- Todos os inputs são validados com Zod
- Respostas de erro fornecem detalhes claros
- Senhas e tokens sensíveis nunca são expostos em logs

## 📝 Regras de Negócio

### Busca de Endereço

- Aceita CEP ou texto de endereço
- Normaliza o endereço retornado
- Resultados são cacheados por 24h
- Suporta endereços em português

### Cálculo de Rotas

- Suporta três modos: driving, walking, bicycling
- Retorna distância em km e duração em minutos
- Inclui instruções passo a passo
- Resultados são cacheados por 24h

### Cache

- Resultados são cacheados automaticamente
- TTL padrão: 24 horas
- Chave de cache inclui: tipo de busca + parâmetros
- Redis sincroniza cache entre múltiplas instâncias

## 🤝 Integração com Frontend

O frontend comunica com a API através de um serviço centralizado:

```typescript
import { apiService } from './services/api';

// Buscar endereço
const resultado = await apiService.buscarEndereco('Av. Paulista, São Paulo');

// Calcular rota
const rota = await apiService.calcularRota({
  origem: { latitude: -23.5505, longitude: -46.6333 },
  destino: { latitude: -23.5646, longitude: -46.6522 },
  modoViagem: 'driving'
});
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Mantido por:** Francisco Honorat  
**Última atualização:** Março 2026  
**Repositório:** [GitHub](https://github.com/FranciscoHonorat/Sistema-de-Geolocaliza--o-e-Rotas-main)
