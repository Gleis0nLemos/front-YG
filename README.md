## Getting Started

This project requires a backend API to handle confirmations and gifts. You need to set up environment variables before running.

### 1. Create `.env.local`

Create a file named `.env.local` in the root of the project and add the following variables:

```env
# URL da API para confirmações de presença
NEXT_PUBLIC_ATTENDANCE_API_URL=http://localhost:3001/api/attendance

# URL da API para a lista de presentes
NEXT_PUBLIC_GIFT_API_URL=http://localhost:3001/api/gift

# Chave de autenticação da API (obrigatória para ações protegidas como admin)
NEXT_PUBLIC_API_KEY=sua-chave-secreta-aqui

```

### Install dependencies
```
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run the development server
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```