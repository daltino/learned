FROM node:current-alpine

RUN npm rebuild node-sass
RUN npm install npm -g

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm ci
