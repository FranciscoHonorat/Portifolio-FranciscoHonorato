# 🔍 WebScanner

Scanner automatizado de vulnerabilidades web com multithreading e geração de relatórios HTML detalhados.

[![Python](https://img.shields.io/badge/Python-3.12+-blue?logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Contributions](https://img.shields.io/badge/Contributions-Welcome-orange)](CONTRIBUTING.md)

## 📋 Sobre

Um scanner de segurança web desenvolvido em Python que realiza análises automatizadas de vulnerabilidades comuns, com processamento paralelo via multithreading e geração de relatórios interativos em HTML.

O projeto foi desenvolvido com foco em:

- 🎯 **Automação:** Varredura completa de vulnerabilidades sem intervenção manual
- ⚡ **Performance:** Processamento paralelo com multithreading adaptativo
- 📊 **Relatórios:** Documentação detalhada e profissional das vulnerabilidades encontradas
- 🔒 **Segurança:** Testes baseados em padrões OWASP Top 10

## 🚀 Funcionalidades

### 🕵️‍♂️ Detecção de Vulnerabilidades

#### 💥 SQL Injection (SQLi)

- Testa formulários com payloads de SQL injection básico
- Identifica respostas com erros SQL típicos
- Detecta padrões de erro como `SQL`, `MySQL`, `ORA-`, `MSSQL`
- Exemplo: `' OR '1'='1`

#### 🔗 Cross-Site Scripting (XSS)

- Identifica vulnerabilidades de XSS refletido
- Testa payloads JavaScript:
  - `<script>alert('XSS')</script>`
  - `<img src=x onerror="alert('XSS')">`
  - `<svg onload="alert('XSS')">`
- Verifica se payloads aparecem sem sanitização na resposta

#### 📁 Descoberta de Diretórios

- Enumera diretórios e arquivos ocultos usando wordlist
- Testa caminhos comuns: `/admin`, `/api`, `/config`, `/backup`
- Identifica endpoints HTTP 200 acessíveis
- Diferencia entre 404, 403 e respostas legítimas

#### 🌐 Análise CORS

- Detecta configurações inseguras de CORS
- Valida headers de resposta:
  - `Access-Control-Allow-Origin`
  - `Access-Control-Allow-Credentials`
  - `Access-Control-Allow-Methods`
- Identifica wildcards perigosos (`*`)

### ⚡ Performance

- **Multithreading adaptativo** - Até 5 threads simultâneas baseado em CPUs disponíveis
- **Varreduras rápidas e escaláveis** - Processamento paralelo de requisições
- **Barra de progresso em tempo real** - Acompanhamento visual do progresso
- **Timeout configurável** - Proteção contra travamentos (padrão: 10s)

### 📊 Relatórios

- **Geração automática de relatórios HTML** estilizados
- **Análise detalhada** de cada vulnerabilidade encontrada
- **Interface amigável e responsiva** - Exibição profissional dos resultados
- **Recomendações de remediação** - Instruções de como corrigir vulnerabilidades
- **Níveis de severidade** - Classificação de riscos (Crítico, Alto, Médio, Baixo)

## 📦 Instalação

### Pré-requisitos

- Python 3.12 ou superior
- pip (gerenciador de pacotes Python)

### Passos de Instalação

```bash
# Clone o repositório
git clone https://github.com/FranciscoHonorat/WebScanner.git
cd WebScanner

# Instale as dependências
pip install -r requirements.txt
```

### Dependências

```
requests>=2.31.0
beautifulsoup4>=4.12.0
colorama>=0.4.6
tqdm>=4.65.0
```

## 📂 Estrutura do Projeto

```
WebScanner/
├── scanner.py              # Lógica principal de scanning
├── targets.txt             # Lista de URLs para varredura
├── wordlist.txt            # Dicionário de diretórios a testar
├── report.html             # Relatório gerado
├── report_template.html    # Template para geração de relatórios
├── requirements.txt        # Dependências do projeto
├── README.md              # Documentação
├── LICENSE                # Licença MIT
└── tests/
    ├── sql_injection.txt   # Payloads de teste SQL Injection
    └── xss_payloads.txt    # Payloads de teste XSS
```

### Descrição dos Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `scanner.py` | Script principal com lógica de varredura |
| `targets.txt` | URLs a serem analisadas (uma por linha) |
| `wordlist.txt` | Dicionário de caminhos para directory enumeration |
| `report.html` | Relatório gerado após varredura |
| `report_template.html` | Template HTML para customização de relatórios |
| `requirements.txt` | Dependências Python |

## 🔧 Uso

### 1️⃣ Configurar Alvo(s)

Edite `targets.txt` com as URLs a serem analisadas (uma por linha):

```
http://example.com
https://vulnerable-site.com
http://localhost:8080
http://app-test.local:3000
```

**Dicas:**

- Use `http://` ou `https://` explicitamente
- Inclua a porta se não for a padrão (80 ou 443)
- Uma URL por linha
- Linhas vazias e comentários são ignorados

### 2️⃣ Configurar Wordlist (Opcional)

Edite `wordlist.txt` com diretórios para enumerar:

```
/admin
/login
/api
/config
/backup
/uploads
/tmp
/test
/debug
/database
```

**Exemplo de wordlist expandida:**

```
/admin
/api
/api/v1
/api/v2
/backup
/config
/data
/debug
/downloads
/files
/images
/upload
/uploads
```

### 3️⃣ Executar Scanner

```bash
python scanner.py
```

O scanner executará:

1. ✅ Leitura de todas as URLs de `targets.txt`
2. ✅ Execução dos testes de vulnerabilidade
3. ✅ Processamento paralelo via multithreading
4. ✅ Geração de relatório em `report.html`

### 4️⃣ Visualizar Resultado

Abra `report.html` no navegador para ver o relatório completo:

```bash
# Windows
start report.html

# macOS
open report.html

# Linux
xdg-open report.html
```

## 🔐 Testes de Segurança

### 💥 SQL Injection

- **O que testa:** Vulnerabilidades de injeção SQL em formulários
- **Payloads:** `' OR '1'='1`, `1' OR '1'='1' --`, `admin'--`
- **Indicadores:** Erros SQL (MySQL, PostgreSQL, Oracle, MSSQL)
- **Severity:** Crítico

**Exemplo de resposta vulnerável:**

```
You have an error in your SQL syntax; check the manual...
```

### 🔗 Cross-Site Scripting (XSS)

- **O que testa:** Vulnerabilidades de XSS refletido e stored
- **Payloads:**
  - `<script>alert('XSS')</script>`
  - `<img src=x onerror="alert('XSS')">`
  - `<svg onload="alert('XSS')">`
- **Indicadores:** Scripts não sanitizados na resposta
- **Severity:** Alto

**Exemplo de resposta vulnerável:**

```html
<p>Olá <script>alert('XSS')</script></p>
```

### 📁 Directory Enumeration

- **O que testa:** Existência de diretórios e arquivos acessíveis
- **Método:** HTTP HEAD/GET para cada caminho em wordlist
- **Indicadores:** HTTP 200 em caminhos ocultos
- **Severity:** Médio

**Exemplo de direitos encontrados:**

```
✓ http://target.com/admin (200)
✓ http://target.com/config (200)
✓ http://target.com/api/v1 (200)
```

### 🌐 CORS (Cross-Origin Resource Sharing)

- **O que testa:** Configurações inseguras de CORS
- **Headers analisados:**
  - `Access-Control-Allow-Origin`
  - `Access-Control-Allow-Credentials`
  - `Access-Control-Allow-Methods`
- **Indicadores:** Wildcard `*` ou credenciais com `*`
- **Severity:** Alto

**Exemplo de configuração vulnerável:**

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```

## 📊 Saída

### Relatório HTML

O relatório gerado inclui:

#### 📈 Resumo Executivo

- Estatísticas gerais de vulnerabilidades
- Distribuição por severidade
- URLs analisadas
- Tempo de execução

#### 🔍 Detalhes por Vulnerabilidade

Para cada flaw encontrado:

```
┌─────────────────────────────────────┐
│ Tipo de Vulnerabilidade             │
├─────────────────────────────────────┤
│ Severidade: CRÍTICO                 │
│ URL: http://target.com/search       │
│ Parâmetro: q                        │
│ Payload: ' OR '1'='1                │
│ Descrição: SQL Injection detectada  │
│ Recomendação: Usar prepared        │
│ statements com parametrização       │
└─────────────────────────────────────┘
```

#### 🔧 Recomendações de Remediação

- Instruções específicas para cada tipo de vulnerabilidade
- Links para referências (OWASP, CWE)
- Boas práticas de segurança

#### 📝 Metadados

- Data e hora do scan
- Versão do scanner
- Número total de requisições
- Taxa de sucesso

## ⚙️ Configuração Avançada

### Ajuste de Threads

O número de threads é automaticamente calculado:

```python
max_threads = min(5, os.cpu_count() * 2)
```

- **Padrão:** min(5 threads, CPUs × 2)
- **Máximo:** 5 threads simultâneas
- **Razão:** Evitar overhead e bloqueios

### Timeout

Requisições HTTP utilizam timeout padrão:

```python
self.session.timeout = 10  # 10 segundos
```

- **Padrão:** 10 segundos por requisição
- **Aplicável:** Todas as requisições HTTP
- **Razão:** Proteção contra sites lentos/indisponíveis

### Rate Limiting

```python
delay = 0.5  # meio segundo entre requisições
```

- Evita sobrecarga de servidores alvo
- Reduz chance de bloqueio por WAF/IPS
- Configurável no `scanner.py`

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

### Como Contribuir

1. **Faça um Fork** do projeto
   ```bash
   # No GitHub, clique em "Fork"
   ```

2. **Clone seu fork**
   ```bash
   git clone https://github.com/seu-usuario/WebScanner.git
   cd WebScanner
   ```

3. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/MinhaNovaFuncionalidade
   ```

4. **Commit suas mudanças**
   ```bash
   git commit -m "Adiciona: Descrição clara da mudança"
   ```

5. **Push para o branch**
   ```bash
   git push origin feature/MinhaNovaFuncionalidade
   ```

6. **Abra um Pull Request** no GitHub

### Áreas para Contribuição

- 🔐 Novos testes de vulnerabilidade
- 📊 Melhorias no relatório HTML
- ⚡ Otimizações de performance
- 📖 Documentação expandida
- 🧪 Testes unitários
- 🌍 Suporte a múltiplos idiomas
- 🎨 Interface web para configuração

## ⚠️ Aviso Legal

### Responsabilidade

Este software destina-se **apenas para fins educacionais** e **testes de segurança autorizados**.

### Usos Proibidos

- ❌ Scanning não autorizado de sistemas de terceiros
- ❌ Acesso não autorizado a dados
- ❌ Disrupção de serviços
- ❌ Violação de leis de segurança da informação

### Conformidade Legal

O uso não autorizado contra sistemas de terceiros é **ilegal** em praticamente todas as jurisdições.

Os autores **não são responsáveis** pelo uso indevido deste software.

**Use apenas em:**

- ✅ Seus próprios sistemas
- ✅ Ambientes de teste autorizados
- ✅ Sistemas onde você tem permissão explícita
- ✅ Contextos educacionais

## 📝 Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo `LICENSE` para detalhes.

### MIT License

```
Copyright (c) 2026 Francisco Honorat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## 👤 Autor

**Francisco Honorat**

- 🐙 GitHub: [@FranciscoHonorat](https://github.com/FranciscoHonorat)
- 💼 LinkedIn: [Francisco Honorat](https://linkedin.com/in/francisco-honorat)
- 📧 Email: jeffhonorato230@gmail.com

## 📞 Suporte

### Reportar Bugs

Encontrou um bug? Abra uma issue no repositório:

1. Vá para [Issues](https://github.com/FranciscoHonorat/WebScanner/issues)
2. Clique em "New Issue"
3. Descreva:
   - O comportamento esperado
   - O comportamento atual
   - Passos para reproduzir
   - Sistema operacional e versão Python

### Sugestões e Dúvidas

- 💬 Abra uma [Discussion](https://github.com/FranciscoHonorat/WebScanner/discussions)
- ⭐ Se este projeto te ajudou, considere dar uma estrela!

## 📚 Recursos Adicionais

### Segurança Web

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE - Common Weakness Enumeration](https://cwe.mitre.org/)
- [SANS Top 25](https://www.sans.org/top25-software-errors/)

### Testes de Segurança

- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Pentesting Guide](https://en.kali.org/)
- [Security Headers](https://securityheaders.com/)

### Ferramentas Relacionadas

- [Burp Suite](https://portswigger.net/burp)
- [OWASP ZAP](https://www.zaproxy.org/)
- [Nmap](https://nmap.org/)

---

**Última atualização:** Março 2026  
**Versão:** 1.0.0  
**Status:** Ativo e mantido  

Made with ❤️ by Francisco Honorat

Repositório: [github.com/FranciscoHonorat/WebScanner](https://github.com/FranciscoHonorat/WebScanner)
