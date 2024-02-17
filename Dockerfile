FROM node:20.11.1

WORKDIR /app

RUN corepack enable pnpm

COPY environments ./environments
COPY package.json .
COPY tsconfig.json .
COPY src ./src
COPY prisma ./prisma
COPY .gitignore .

RUN pnpm install 

CMD ["pnpm", "run", "dev"]

