## Baixar extensões do VSCode:
- Editor Config
- ESLint

## Não ter extensão ativa no projeto:
- Prettier

## Para instalar as dependências
yarn

## Criar container Docker
sudo docker run --name tci-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

## Rodar as migrations
yarn typeorm migration:run

## Inicializar o back-end:
yarn dev:server

Back-end UP: 🚀 Server started on port 3333
