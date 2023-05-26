FROM node:alpine3.17

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build
