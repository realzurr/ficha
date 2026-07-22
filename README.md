# Sistema de Fichas de Anamnese - Tenda do Xamãs

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)
![SQLite](https://img.shields.io/badge/SQLite3-3.x-orange?logo=sqlite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-cyan?logo=tailwindcss)

Sistema completo para gerenciamento de fichas de anamnese da **Tenda do Xamãs**. Inclui formulário multi-etapa com validação, painel administrativo e autenticação JWT.

---

## Funcionalidades

- **Formulário Multi-Etapa**: 10 seções com 63 campos, validação em tempo real e lógica condicional
- **Painel Administrativo**: Visualização, busca, edição e exclusão de fichas recebidas
- **Autenticação JWT**: Sistema de login seguro com controle de acesso
- **Exportação**: Suporte a exportação para PDF e CSV
- **Mobile-First**: Design responsivo otimizado para dispositivos móveis
- **PWA Suporte**: Progressive Web App com service worker
- **Banco de Dados SQLite**: Armazenamento local sem necessidade de servidor de banco externo

---

## Estrutura do Projeto

```
sistema-anamnese/
├── backend/
│   ├── data/                    # Banco de dados SQLite
│   ├── migrations/              # Scripts de migração
│   ├── routes/                  # Rotas da API (fichas.js, auth.js)
│   ├── server.js                # Servidor principal Express
│   ├── database.js              # Configuração do banco de dados
│   └── create-admin.js          # Script para criar usuário admin
├── frontend/
│   ├── public/                  # Arquivos estáticos (PWA icons)
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormFields.jsx   # Componentes reutilizáveis de formulário
│   │   │   ├── Section*.jsx     # 10 seções do formulário
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── FormularioAnamnese.jsx  # Página do formulário
│   │   │   ├── PainelAdmin.jsx         # Painel administrativo
│   │   │   ├── Login.jsx               # Página de login
│   │   │   └── DetalhesFicha.jsx       # Detalhes da ficha
│   │   ├── styles/
│   │   │   └── index.css        # Design system CSS
│   │   ├── App.jsx              # Rotas da aplicação
│   │   └── main.jsx             # Entry point
│   ├── index.html               # HTML principal com PWA meta tags
│   ├── vite.config.js           # Configuração Vite
│   ├── tailwind.config.js       # Configuração Tailwind
│   └── package.json
├── deploy.sh                    # Script de deploy automático
├── nginx-anamnese.conf          # Configuração Nginx reverse proxy
├── start-dev.sh                 # Script para ambiente de desenvolvimento
├── INSTALL.md                   # Guia de instalação manual
└── PRODUCTION.md                # Guia de deploy em produção
```

---

## Tecnologias

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | React 18, Vite 5, Tailwind CSS 3 |
| **Backend** | Node.js 20, Express 4 |
| **Banco de Dados** | SQLite3 (better-sqlite3) |
| **Autenticação** | JWT (jsonwebtoken) + bcrypt |
| **Formulários** | React Hook Form + Input Mask |
| **Ícones** | Lucide React |
| **Notificações** | React Toastify |

---

## Pré-requisitos

- Node.js v20+ ([https://nodejs.org](https://nodejs.org))
- npm v10+
- (Opcional) PM2 para produção
- (Opcional) Nginx para reverse proxy

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/sistema-anamnese.git
cd sistema-anamnese
```

### 2. Instalar dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Criar banco de dados e usuário admin

```bash
cd ../backend
npm run migrate
node create-admin.js
```

### 4. Iniciar em modo desenvolvimento

```bash
# Opção 1: Usar script automático
./start-dev.sh

# Opção 2: Iniciar manualmente (2 terminais)

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Acessar

| URL | Descrição |
|-----|-----------|
| `http://localhost:30016` | Formulário de Anamnese |
| `http://localhost:30016/login` | Painel Administrativo |
| `http://localhost:30015/api` | API Backend |

---

## Credenciais Padrão

| Campo | Valor |
|-------|-------|
| **Usuário** | `admin` |
| **Senha** | `admin123` |

> **IMPORTANTE**: Altere a senha após o primeiro login!

---

## Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/`:

```env
NODE_ENV=production
PORT=30015
FRONTEND_URL=http://seu-dominio.com.br
JWT_SECRET=sua-chave-secreta-aqui
```

Para gerar um `JWT_SECRET` seguro:

```bash
openssl rand -hex 32
```

---

## API Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/auth/login` | Login do usuário |
| `POST` | `/api/auth/register` | Registrar novo usuário |
| `GET` | `/api/auth/verify` | Verificar token JWT |

### Fichas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/fichas` | Listar fichas (paginação e busca) |
| `GET` | `/api/fichas/:id` | Buscar ficha por ID |
| `POST` | `/api/fichas` | Criar nova ficha |
| `PUT` | `/api/fichas/:id` | Atualizar ficha |
| `DELETE` | `/api/fichas/:id` | Excluir ficha |
| `GET` | `/api/fichas/stats/overview` | Estatísticas gerais |
| `GET` | `/api/health` | Health check da API |

---

## Deploy em Produção

### Build do Frontend

```bash
cd frontend
npm run build
```

### Iniciar com PM2

```bash
cd backend
pm2 start server.js --name anamnese-tenda
pm2 save
pm2 startup
```

### Configurar Nginx (Opcional)

```bash
sudo cp nginx-anamnese.conf /etc/nginx/sites-available/anamnese
sudo ln -s /etc/nginx/sites-available/anamnese /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Para guia completo de instalação, veja [INSTALL.md](INSTALL.md).

---

## Seções do Formulário

| # | Seção | Campos |
|---|-------|--------|
| 1 | Dados Pessoais | Nome, CPF, data de nascimento, WhatsApp, etc. |
| 2 | Saúde | Condições de saúde, medicamentos, alergias |
| 3 | Saúde Mental | Histórico de saúde mental |
| 4 | Substâncias | Uso de substâncias psicoativas |
| 5 | Traumas | Histórico de traumas |
| 6 | Ayahuasca | Experiências com ayahuasca |
| 7 | Transtornos | Transtornos diagnosticados |
| 8 | Estilo de Vida | Hábitos, rotina, alimentação |
| 9 | Contato de Emergência | Nome e telefone de contato |
| 10 | Finalizar | Observações e consentimento |

---

## Comandos Úteis

```bash
# Desenvolvimento
./start-dev.sh                    # Iniciar ambos os servidores

# Backend
cd backend
npm run dev                       # Iniciar com nodemon
npm run migrate                   # Executar migrações
node create-admin.js              # Criar usuário admin

# Frontend
cd frontend
npm run dev                       # Iniciar servidor de desenvolvimento
npm run build                     # Build para produção
npm run preview                   # Preview do build

# Produção (PM2)
pm2 status                        # Ver status dos processos
pm2 logs anamnese-tenda           # Ver logs
pm2 restart anamnese-tenda        # Reiniciar
pm2 stop anamnese-tenda           # Parar
```

---

## Backup

```bash
# Backup do banco de dados
cp backend/data/anamnese.db backup/anamnese-$(date +%Y%m%d).db
```

---

## Licença

Projeto proprietário - **Tenda do Xamãs**

---

## Contato

- **Tenda do Xamãs** - contato@tendadoxamas.com.br
