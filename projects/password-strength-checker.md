# 🔐 Password Strength Checker

Uma ferramenta avançada para análise de força de senhas com verificação de vazamentos de dados e geração de relatórios em PDF. O projeto oferece uma solução completa e segura para avaliar a segurança de senhas, identificar riscos potenciais e documentar os resultados.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [🌟 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [📦 Instalação](#-instalação)
- [🚀 Como Usar](#-como-usar)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [📚 Documentação das Funcionalidades](#-documentação-das-funcionalidades)
- [🔒 Segurança e Privacidade](#-segurança-e-privacidade)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## Visão Geral

O Password Strength Checker é uma aplicação em Python que combina múltiplas camadas de validação de segurança de senhas:

- **Análise Local de Complexidade** - Usa o algoritmo zxcvbn para avaliar a força da senha
- **Verificação de Vazamentos** - Consulta o banco de dados Have I Been Pwned (HIBP)
- **Geração de Relatórios** - Cria documentos PDF detalhados com os resultados

## 🌟 Funcionalidades

- ✅ **Análise de Complexidade Avançada** - Algoritmo zxcvbn que considera padrões comuns, dicionários e padrões de teclado
- 🔍 **Verificação de Vazamentos** - Consulta em tempo real a API Have I Been Pwned para detectar se a senha foi exposta em data breaches
- 📊 **Relatório PDF Detalhado** - Gera documentos profissionais com análise completa da segurança
- ⏱️ **Estimativa de Tempo de Quebra** - Calcula quanto tempo seria necessário para quebrar a senha usando força bruta
- 🛡️ **Proteção de Privacidade** - Nunca armazena senhas em disco ou logs; usa hashing SHA-1 para verificação remota
- 🌐 **Interface Amigável** - Entrada segura de senha via getpass e feedback claro ao usuário
- 🧩 **Arquitetura Modular** - Separação clara de responsabilidades em módulos independentes

## 🛠️ Tecnologias

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| Python | 3.12+ | Linguagem de programação principal |
| zxcvbn | 4.4.28 | Análise de força de senha baseada em padrões |
| requests | 2.31.0 | Cliente HTTP para requisições à API HIBP |
| fpdf2 | 2.7.4 | Geração de relatórios em PDF |

### Python Dependencies

```
zxcvbn ~= 4.4.28
requests ~= 2.31.0
fpdf2 ~= 2.7.4
```

## 📦 Instalação

### Pré-requisitos

- Python 3.12 ou superior
- pip (gerenciador de pacotes Python)
- Conexão com a internet (para verificação de vazamentos)

### Passos de Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/FranciscoHonorat/Password-Strength-Checker.git
   cd Password-Strength-Checker
   ```

2. **Crie um ambiente virtual (recomendado):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

## 🚀 Como Usar

### Modo Interativo

Execute a aplicação principal:

```bash
python app.py
```

A aplicação solicitará a senha de forma segura (entrada mascarada) e exibirá:

- Pontuação de força (0-4)
- Tempo estimado para quebra via força bruta
- Número de vazamentos encontrados no HIBP
- Geração automática de um relatório PDF

### Exemplo de Saída

```
=== Password Strength Checker ===
Digite a senha para análise: ••••••••••

Pontuação: 3/4
Tempo para quebrar: 2 dias
Vazamentos: Não encontrados

Relatório gerado em report.pdf
```

### Modo Debugger

Para análises mais detalhadas com feedback adicional:

```bash
python app_debug.py
```

Este modo fornece informações expandidas sobre:

- Padrões detectados
- Sugestões de melhoria
- Detalhes do feedback do algoritmo zxcvbn

## 📁 Estrutura do Projeto

```
Password-Strength-Checker/
├── app.py                 # Aplicação principal com fluxo de produção
├── app_debug.py          # Versão com modo debug e saída expandida
├── requirements.txt      # Dependências do projeto
├── README.md            # Este arquivo
│
├── core/                # Módulo principal da análise
│   ├── __init__.py
│   ├── checker.py      # Análise de complexidade de senha
│   └── hibp.py         # Verificação de vazamentos (Have I Been Pwned)
│
└── utils/               # Utilitários e ferramentas
    ├── __init__.py
    ├── report.py       # Geração de relatórios em PDF
    └── visualizer.py   # Visualização de dados (em desenvolvimento)
```

## 📚 Documentação das Funcionalidades

### 🔍 Módulo de Análise de Força (core/checker.py)

#### Classe: PasswordChecker

Realiza análise local da força da senha usando o algoritmo zxcvbn.

```python
from core.checker import PasswordChecker

checker = PasswordChecker("sua_senha_aqui")
result = checker.analyze()

# Resultado contém:
# - score: 0-4 (0=muito fraca, 4=muito forte)
# - guess_time: Tempo estimado em português
# - feedback: Aviso sobre a senha
# - suggestions: Lista de sugestões de melhoria
```

#### Método: analyze()

- **Retorna:** Dicionário com análise completa
- **Exceções:** Trata erros e retorna resultado seguro

#### Método: format_time(time_str)

- Converte strings de tempo do inglês para português
- Mantém compatibilidade com a API zxcvbn

#### Critérios de Força:

- **Score 0:** Muito fraca (< 10³ tentativas)
- **Score 1:** Fraca (10³ - 10⁶ tentativas)
- **Score 2:** Razoável (10⁶ - 10⁸ tentativas)
- **Score 3:** Forte (10⁸ - 10¹⁰ tentativas)
- **Score 4:** Muito forte (> 10¹⁰ tentativas)

### 🌐 Verificação de Vazamentos (core/hibp.py)

#### Classe: HIBPChecker

Consulta a API Have I Been Pwned para verificar se a senha foi exposta.

```python
from core.hibp import HIBPChecker

hibp = HIBPChecker()
count = hibp.check("sua_senha_aqui")

# Retorna:
# - número > 0: Quantidade de vezes que foi encontrada em data breaches
# - 0: Não foi encontrada
# - -1: Erro na requisição (sem conexão)
```

#### Processo de Verificação (k-anonymity):

1. Calcula SHA-1 da senha
2. Envia apenas os 5 primeiros caracteres para a API
3. Recebe lista de hashes com mesmo prefixo
4. Compara localmente o sufixo (mantém privacidade)

**Segurança:** A senha nunca é enviada completa à API, apenas um prefixo de hash SHA-1.

### 📊 Geração de Relatórios (utils/report.py)

#### Classe: PDFReport

Cria relatórios em PDF com os resultados da análise.

```python
from utils.report import PDFReport

report = PDFReport()
report.generate({
    'password': '••••••••',
    'score': 3,
    'guess_time': '2 dias',
    'leaks': 0
}, filename="meu_relatorio.pdf")
```

#### Conteúdo do Relatório:

- Título: "Relatório de Segurança de Senha"
- Senha (mascarada com asteriscos)
- Nível de Segurança (0-4)
- Tempo estimado para quebra
- Número de vazamentos encontrados

## 🔒 Segurança e Privacidade

### ✅ Práticas de Segurança Implementadas

#### Sem Armazenamento de Senhas

- Senhas não são salvas em disco
- Não há logs com senhas em claro
- Dados processados apenas em memória

#### Entrada Segura

- Utiliza getpass para ocultarem de visualização
- Mascaradas com asteriscos em relatórios

#### Verificação Privada de Vazamentos

- Usa k-anonymity (protocolo de Cloudflare)
- Apenas prefixo de 5 caracteres do hash é enviado
- Comparação do sufixo feita localmente

#### Timeout em Requisições

- Limite de 5 segundos para requisições HIBP
- Evita travamentos prolongados

#### Tratamento de Erros

- Tentativas falhas retornam valores seguros
- Não expõem detalhes internos do erro

### ⚠️ Limitações e Considerações

- A verificação HIBP requer conexão com a internet
- Senhas muito comuns podem estar em bases de dados públicas
- Força da senha não garante segurança total da conta (depende também de outros fatores)

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. **Fork o repositório**
   ```bash
   git clone https://github.com/seu-usuario/Password-Strength-Checker.git
   ```

2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/MinhaNovaFuncionalidade
   ```

3. **Commit suas mudanças**
   ```bash
   git commit -m "Adiciona: descrição da mudança"
   ```

4. **Push para a branch**
   ```bash
   git push origin feature/MinhaNovaFuncionalidade
   ```

5. **Abra um Pull Request**

### Areas para Contribuição

- 🎨 Melhorar interface do relatório PDF
- 📈 Implementar visualizador de dados (visualizer.py)
- 🌐 Interface web com Flask/Django
- 📱 App mobile
- 🧪 Testes unitários e de integração
- 📖 Documentação expandida
- 🌍 Suporte a múltiplos idiomas

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

---

### 🎓 Recursos Adicionais

#### Sobre zxcvbn
- [Repositório zxcvbn](https://github.com/dropbox/zxcvbn)
- [Documentação](https://github.com/dropbox/zxcvbn#readme)

#### Sobre Have I Been Pwned
- [HIBP - Have I Been Pwned](https://haveibeenpwned.com/)
- [Documentação da API](https://haveibeenpwned.com/API/v3)

#### Protocolo k-anonymity
- [Recursos sobre Segurança de Senhas](https://owasp.org/www-community/attacks/Password_attacks)

#### Referências de Segurança
- [OWASP - Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [NIST Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html)

---

**Mantido por:** Francisco Honorat  
**Última atualização:** Março 2026
