FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN yarn install

Run npm install run-rs -g

RUN run-rs

COPY . .

RUN yarn build

