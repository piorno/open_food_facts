FROM node:18 as base

WORKDIR /home/node/app

COPY package*.json ./
COPY .env ./

RUN npm i

COPY . .

FROM base as production

RUN npm run dev