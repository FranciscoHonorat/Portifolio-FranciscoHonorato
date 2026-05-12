# 🍔 Good Hamburguer

Plataforma web full stack para gerenciamento de hamburgueria com sistema de pedidos, painel administrativo e integração com sistema de pagamentos.

---

## 📋 Visão Geral

- **Problema real:** Necessidade de sistema online para gerenciamento de pedidos e vendas de hamburgueria
- **Solução implementada:** Plataforma completa com interface para clientes e painel administrativo
- **Usuários:** Clientes fazendo pedidos, gerentes gerenciando vendas

## 🏗️ Arquitetura

```
Good Hamburguer
│
├── Frontend (React + TypeScript)
│   ├── Cliente
│   │   ├── Catálogo de Produtos
│   │   ├── Carrinho de Compras
│   │   └── Checkout
│   └── Admin
│       ├── Dashboard
│       ├── Gestão de Produtos
│       └── Gestão de Pedidos
│
├── Backend (Node.js + Express)
│   ├── API REST
│   ├── Autenticação JWT
│   ├── Validação
│   └── Integrações
│
└── Database (PostgreSQL)
    ├── Produtos
    ├── Pedidos
    ├── Usuários
    └── Pagamentos
```

## 🎯 Principais Decisões Técnicas

1. **JWT Authentication** - Segurança na autenticação de usuários
2. **Carrinho Persistente** - Salvar carrinho em localStorage com sincronização
3. **Pagination** - Pagination para catálogo de produtos
4. **Order Status Flow** - Estados de pedido bem definidos (pendente, confirmado, pronto, entregue)
5. **Payment Integration** - Integração com Stripe/PagSeguro para pagamentos seguros
6. **Admin Dashboard** - Painel para gerenciamento completo de vendas

## 🔧 Stack Utilizado

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React, TypeScript, Vite |
| **Styling** | Tailwind CSS |
| **State Management** | Zustand, React Query |
| **Backend** | Node.js, Express |
| **Database** | PostgreSQL |
| **ORM** | Sequelize / TypeORM |
| **Payment** | Stripe API |
| **Authentication** | JWT |

## 📊 Funcionalidades

### Cliente
- ✅ Visualizar catálogo de produtos
- ✅ Adicionar itens ao carrinho
- ✅ Editar quantidade e remover itens
- ✅ Realizar checkout
- ✅ Escolher forma de pagamento
- ✅ Acompanhar status do pedido

### Admin
- ✅ Dashboard com estatísticas
- ✅ CRUD de produtos
- ✅ Gerenciamento de categorias
- ✅ Visualizar todos os pedidos
- ✅ Atualizar status de pedidos
- ✅ Relatórios de vendas

## 🚀 Como Rodar

```bash
# Clone o repositório
git clone https://github.com/FranciscoHonorat/good-hamburguer.git
cd good-hamburguer

# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm run dev
```

## 🎓 Principais Aprendizados

- **E-commerce Flow:** Implementar fluxo completo de compra
- **Payment Processing:** Integração segura com gateways de pagamento
- **State Management:** Gerenciar estado complexo do carrinho e pedidos
- **Authorization:** Diferentes permissões para clientes e admin
- **Real-time Updates:** Notificações quando pedidos mudam de status
- **Performance:** Otimização de queries de produtos e pedidos
- **UX Design:** Interface intuitiva para clientes

## 🔗 Links

- 📁 [GitHub](https://github.com/FranciscoHonorat/good-hamburguer)

---

**Desenvolvido em:** 2025
