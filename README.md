# 🚀 GetDev( ) - Plataforma de Freelancer para Dev

**GetDev( )** é uma plataforma de freelancing voltada para a área de tecnologia, conectando **contratantes** a **desenvolvedores** de forma simples e eficiente.

A aplicação permite que contratantes publiquem projetos e que desenvolvedores encontrem oportunidades, enviem solicitações e construam seu portfólio com base em avaliações reais.

---

## 📌 Funcionalidades

### 👤 Tipos de Usuário
- **Contratante**
- **Desenvolvedor**

### 🧑‍💼 Contratante
- Criar posts de projetos
- Visualizar solicitações de desenvolvedores
- Aceitar ou recusar solicitações
- Finalizar projetos
- Avaliar desenvolvedores ao final do projeto

### 👨‍💻 Desenvolvedor
- Visualizar projetos disponíveis na home
- Enviar solicitação para projetos
- Ter avaliações adicionadas ao seu portfólio

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java**
- **Spring Boot**
- **PostgreSQL**

### Frontend
- **React**
- **Vite**
- **TypeScript**
- **Tailwind CSS**

### Infraestrutura
- **Docker**
- **Docker Compose**

---

## 🐳 Executando o Projeto com Docker

O projeto foi totalmente containerizado, permitindo executar toda a aplicação com poucos comandos.

### 🔧 Pré-requisitos
- Docker
- Docker Compose

### ▶️ Subindo a aplicação

```bash
docker-compose up --build
```
Para rodar em background:

```bash
docker-compose up -d
```
🌐 Acesso à Aplicação
Após subir os containers, acesse no navegador:

```arduino

http://localhost:5173/auth/login
```
## 🗄️ Banco de Dados
- PostgreSQL

O banco é inicializado automaticamente via Docker

## 📁 Estrutura do Projeto (resumida)
````bash

getdev/
├── backend/        
├── frontend/       
├── docker-compose.yml
└── README.md
````


