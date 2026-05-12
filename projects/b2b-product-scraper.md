# 🤖 B2B Product Scraper

Ferramenta robusta de web scraping para coleta automatizada de dados de produtos B2B com tratamento de erros, rate limiting e proxy rotation.

---

## 📋 Visão Geral

- **Problema real:** Necessidade de coletar grandes volumes de dados de produtos de múltiplas fontes B2B
- **Solução implementada:** Sistema de scraping automatizado com suporte a proxy, rate limiting e tratamento de erros
- **Usuários:** Pesquisa de mercado, análise competitiva, inteligência de negócios

## 🏗️ Arquitetura

```
B2B Scraper
├── Collector Layer
│   ├── Proxy Manager
│   ├── Request Handler
│   └── Rate Limiter
├── Parser Layer
│   ├── HTML Parser
│   └── Data Extractor
├── Storage Layer
│   └── PostgreSQL
└── Monitoring
    └── Logs & Metrics
```

## 🎯 Principais Decisões Técnicas

1. **Proxy Rotation** - Distribuição de requisições entre múltiplos proxies para evitar bloqueios
2. **Rate Limiting** - Controle de velocidade de requisições respeitando terms of service
3. **Retry Logic** - Tentativas com backoff exponencial para requisições falhadas
4. **Data Validation** - Validação de dados extraídos antes de persistência
5. **Logging Estruturado** - Monitoramento detalhado de sucesso e falhas

## 🔧 Stack Utilizado

| Camada | Tecnologia |
|--------|-----------|
| **Linguagem** | Python 3.10+ |
| **Web Scraping** | BeautifulSoup4, Selenium |
| **HTTP Client** | Requests |
| **Database** | PostgreSQL |
| **Async** | AsyncIO |
| **Monitoring** | Logging, Prometheus |

## 📊 Funcionalidades

- ✅ Coleta de dados de múltiplas URLs
- ✅ Proxy rotation automática
- ✅ Rate limiting configurável
- ✅ Tratamento de JavaScript (Selenium)
- ✅ Retry com backoff exponencial
- ✅ Validação de dados em tempo real
- ✅ Storage em PostgreSQL
- ✅ Relatórios de execução

## 🚀 Como Rodar

```bash
# Clone o repositório
git clone https://github.com/FranciscoHonorat/b2b-product-scraper.git
cd b2b-product-scraper

# Crie virtual environment
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows

# Instale dependências
pip install -r requirements.txt

# Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Execute
python main.py
```

## 🎓 Principais Aprendizados

- **Web Scraping em Escala:** Como escalar coleta de dados respeitando rate limits
- **Proxy Management:** Estratégias para evitar bloqueios e distribuição de requisições
- **Error Handling:** Tratamento robusto de diversos tipos de falhas (timeout, 403, parsing)
- **Data Validation:** Garantir qualidade dos dados antes de armazenar
- **Async Programming:** Uso de AsyncIO para melhorar performance
- **Infrastructure:** Monitoramento e logging para debugging em produção

## 🔗 Links

- 📁 [GitHub](https://github.com/FranciscoHonorat/b2b-product-scraper)

---

**Desenvolvido em:** 2025
