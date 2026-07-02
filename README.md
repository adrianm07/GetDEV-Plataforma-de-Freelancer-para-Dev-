# GetDEV - Plataforma de Freelancer para Desenvolvedores

GetDEV é uma plataforma de conexão entre desenvolvedores e contratantes, facilitando a publicação de projetos, candidatura a vagas e gestão de contratos freelancer. O sistema permite que contratantes publiquem oportunidades de trabalho e que desenvolvedores se candidatem, gerenciem suas habilidades e construam um portfólio.

A plataforma foi desenvolvida para resolver a dificuldade de encontrar projetos freelancer qualificados na área de tecnologia, oferecendo um ambiente centralizado para gerenciamento de contratos, avaliações e histórico de projetos.

---

# Tecnologias Utilizadas

## 🛠️ Technologies

<p align="center">
  <img src="https://skillicons.dev/icons?i=java,spring,react,ts,postgres,docker,nginx,maven,vite" />
</p>

- **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate, JWT (java-jwt), BCrypt, Maven
- **Frontend:** React, TypeScript, Vite, TailwindCSS, React Router DOM, Axios, Radix UI, Lucide React, Sonner
- **Infrastructure:** Docker, Docker Compose, PostgreSQL, Nginx

---

# Funcionalidades

## Funcionalidades Gerais

- Cadastro de usuários com dois tipos de conta: Desenvolvedor e Contratante
- Autenticação JWT com tokens Bearer
- Gerenciamento de perfil de usuário
- Edição de informações pessoais (nome, email, telefone, foto, descrição)
- Sistema de habilidades para desenvolvedores
- Filtro de projetos por tecnologias

## Funcionalidades para Contratantes

- Criação de posts/projetos com título, descrição, tecnologias, prazo e faixa de preço
- Edição de posts existentes
- Exclusão de posts
- Visualização de solicitações recebidas
- Aceitação ou recusa de solicitações de desenvolvedores
- Atribuição de desenvolvedor a um projeto
- Remoção de desenvolvedor de um projeto
- Conclusão de projetos com avaliação do desenvolvedor
- Avaliação com nota (1-5 estrelas) e comentário opcional
- Listagem de posts próprios (ativos e concluídos)

## Funcionalidades para Desenvolvedores

- Visualização de todos os projetos disponíveis
- Filtro de projetos por tecnologias
- Envio de solicitações para projetos de interesse
- Visualização de detalhes completos dos projetos
- Contato direto com contratantes via email e WhatsApp
- Candidatura a vagas (assumir vaga)
- Histórico de projetos concluídos

## Funcionalidades de Segurança

- Autenticação JWT com expiração de 2 horas
- Autorização baseada em roles (DESENVOLVEDOR, CONTRATANTE)
- CORS configurado para frontend
- Senhas criptografadas com BCrypt
- Filtro de segurança para validação de tokens
- Redirecionamento automático para login em caso de token inválido

---

# Arquitetura

## Application Flow

┌──────────────────┐
│ React + Vite     │
└────────┬─────────┘
         │
   REST API
         │
┌────────▼─────────┐
│ Spring Boot      │
│ Controllers      │
│ Services         │
│ Repositories     │
└────────┬─────────┘
         │
┌──────────────────┐
│ PostgreSQL       │
└──────────────────┘

---

# Estrutura do Projeto

```
GetDEV-Plataforma-de-Freelancer-para-Dev/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/                 # Código backend (Spring Boot)
│   │   │   │   ├── controllers/
│   │   │   │   ├── service/
│   │   │   │   ├── repositories/
│   │   │   │   ├── model/
│   │   │   │   ├── dto/
│   │   │   │   ├── security/
│   │   │   │   └── exceptions/
│   │   │   └── resources/            # Configurações e migrations
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/               # Componentes React
│   │   ├── context/                  # Context API
│   │   ├── hooks/                    # Hooks customizados
│   │   ├── pages/                    # Páginas
│   │   ├── services/                 # Integração com API
│   │   ├── styles/                   # Estilos globais
│   │   ├── types/                    # Tipagens TypeScript
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

# Como Executar o Projeto

## Pré-requisitos

- Docker e Docker Compose instalados
- Java 21 (para execução local do backend)
- Node.js 20 (para execução local do frontend)
- Maven (para execução local do backend)

## Clonar o Repositório

```bash
git clone https://github.com/adrianm07/GetDEV-Plataforma-de-Freelancer-para-Dev-.git
cd GetDEV-Plataforma-de-Freelancer-para-Dev-
```

## Configurar Variáveis de Ambiente

### Backend (.env)

Crie o arquivo `backend/.env` com as seguintes variáveis:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bancoGetDEV
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
JWT_SECRET=seu_secret_jwt_aqui
```

## Executar com Docker Compose (Recomendado)

Esta é a forma mais simples de executar todo o projeto:

```bash
docker-compose up --build
```

O Docker Compose irá:
1. Criar e iniciar o container PostgreSQL
2. Construir e iniciar o backend Spring Boot
3. Construir e iniciar o frontend React com Nginx

A aplicação estará disponível em:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- PostgreSQL: localhost:5432

## Executar Localmente (Desenvolvimento)

### Banco de Dados

Inicie o PostgreSQL com Docker:

```bash
docker-compose up postgres
```

### Backend

Navegue até a pasta backend:

```bash
cd backend
```

Execute com Maven:

```bash
./mvnw spring-boot:run
```

Ou usando Maven instalado:

```bash
mvn spring-boot:run
```

O backend estará disponível em http://localhost:8080

### Frontend

Navegue até a pasta frontend (em outro terminal):

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível em http://localhost:5173

## Acessar a Aplicação

Após iniciar os serviços, acesse:

- **Aplicação Web**: http://localhost:5173
- **API Backend**: http://localhost:8080
- **Banco de Dados**: localhost:5432

---

# Variáveis de Ambiente

## Backend

| Nome | Descrição |
|------|-----------|
| DB_HOST | Host do banco de dados PostgreSQL |
| DB_PORT | Porta do banco de dados PostgreSQL |
| DB_NAME | Nome do banco de dados |
| DB_USER | Usuário do banco de dados |
| DB_PASSWORD | Senha do banco de dados |
| JWT_SECRET | Secret para assinatura dos tokens JWT |


## Docker Compose

| Nome | Descrição | Valor |
|------|-----------|-------|
| POSTGRES_DB | Nome do banco de dados no container | appdb |
| POSTGRES_USER | Usuário do banco de dados no container | appuser |
| POSTGRES_PASSWORD | Senha do banco de dados no container | apppass |

---

# Banco de Dados

## Banco Utilizado

O projeto utiliza **PostgreSQL 16** como banco de dados relacional.

## Migrations

O projeto utiliza migrations SQL manuais localizadas em `backend/src/main/resources/schema/`. As migrations são executadas automaticamente pelo Spring Boot através da configuração `spring.sql.init.mode=always`.

### Estrutura das Migrations

As migrations são organizadas por versão:

1. **V1_create_users_table.sql**: Cria a tabela de usuários
2. **V2_create_posts_table.sql**: Cria a tabela de posts/projetos
3. **V3_create_solicitacoes_table.sql**: Cria a tabela de solicitações

### Seed

Não há scripts de seed configurados. O banco de dados inicia vazio e os dados são criados através da aplicação.

---

### Segurança

A autenticação do sistema é baseada em JWT (JSON Web Token) integrado ao Spring Security, garantindo uma arquitetura stateless e segura.

Principais características:

Autenticação via JWT com geração e validação de tokens usando HMAC256
Tokens com expiração de 2 horas
Sistema stateless (sem uso de sessões HTTP)
Senhas protegidas com BCrypt antes de serem armazenadas no banco
Controle de acesso baseado em roles (DESENVOLVEDOR e CONTRATANTE)
Endpoints /auth/** públicos, demais rotas protegidas
