# Bank API Simulator

Esta é uma API de simulação de conta bancária construída com **NestJS**. Ela permite realizar operações como depósito, saque, transferência e consulta de saldo. A API é protegida por autenticação JWT e inclui documentação Swagger.

---

Este repositório possui o projeto de front-end em: [Bank Dashboard](https://github.com/lcsmelo-0/bank-dashboard).

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)

### Passos

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/bank-api.git
   cd bank-api
   ```

2. **Instalar dependências**:

   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione:

   ```env
   JWT_SECRET=
   ```

4. **Rodar a aplicação**:

   ```bash
   npm run start
   ```

5. **Acessar a documentação da API**:
   Abra o navegador e acesse:
   ```
   http://localhost:3000/api
   ```

---

## Como Rodar com Docker

### Pré-requisitos

- Docker
- Docker Compose

### Passos

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/lcsmelo-0/bank-api.git
   cd bank-api
   ```

2. **Configurar variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione:

   ```env
   JWT_SECRET=
   ```

3. **Construir e rodar o container**:

   ```bash
   docker-compose up --build
   ```

4. **Acessar a documentação da API**:
   Abra o navegador e acesse:
   ```
   http://localhost:3000/api
   ```

---

## Serviços Disponíveis

### Autenticação

- **POST /auth/login**:
  - Autentica o usuário e retorna um token JWT.
  - Exemplo de corpo da requisição:
    ```json
    {
      "username": "admin",
      "password": "admin"
    }
    ```
  - Resposta:
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### Contas Bancárias

- **POST /accounts/reset**:

  - Reseta o estado da aplicação (limpa todas as contas).
  - Resposta:
    ```json
    {
      "status": "OK"
    }
    ```

- **GET /accounts/balance?account_id=1234**:

  - Retorna o saldo da conta.
  - Resposta:
    ```
    20
    ```

- **POST /accounts/event**:
  - Realiza operações bancárias (depósito, saque, transferência).
  - Exemplo de corpo da requisição para depósito:
    ```json
    {
      "type": "deposit",
      "destination": "100",
      "amount": 10
    }
    ```
  - Resposta:
    ```json
    {
      "destination": {
        "id": "100",
        "balance": 10
      }
    }
    ```

---

## Estrutura do Projeto

```
src/
├── accounts/
│   ├── accounts.controller.ts
│   ├── accounts.service.ts
│   └── accounts.module.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── constants
├── dtos/
│   └── accounts/
│       ├── deposit.dto.ts
│       ├── event.dto.ts
│       ├── transfer.dto.ts
│       └── withdraw.dto.ts
│   └── auth/
│       ├── jwt.dto.ts
│       └── login.dto.ts
├── app.module.ts
└── main.ts
```

---

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de APIs escaláveis.
- **Passport.js**: Autenticação JWT.
- **Swagger**: Documentação da API.
- **Docker**: Containerização da aplicação.

<img src="https://images-cdn.openxcell.com/wp-content/uploads/2024/07/25090553/nodejs-inner.webp" alt="NodeJs" width="50" />
<img src="https://nestjs.com/img/logo-small.svg" alt="NestJs" width="50" />
<img src="https://www.docker.com/app/uploads/2023/05/symbol_blue-docker-logo.png" alt="Docker" width="60" />

---
