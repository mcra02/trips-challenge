FROM node:14 as base

USER root

ENV TZ=America/Lima

RUN echo '[DEBUG]   Start create folder and enter...'
WORKDIR /app

RUN echo "[DEBUG]   Copy package.json to app..."
ADD package.json .


RUN echo "[DEBUG]   Install dependencies..."
RUN yarn install

ADD .env .env

FROM base as development
RUN echo "[DEBUG]   Build development enviroment..."
RUN echo "[DEBUG]   Copy files and folders from development enviroment..."
ADD . .

EXPOSE 80

RUN echo "[DEBUG]   Run project for development..."
CMD [ "yarn", "start:dev" ]

FROM base as production
RUN echo "[DEBUG]   Build production enviroment..."
RUN echo "[DEBUG]   Copy files and folders from production enviroment..."
ADD . .

RUN echo "[DEBUG]   Build project for production..."
RUN yarn build

RUN echo "[DEBUG]   Run project for production..."
CMD [ "yarn", "start:prod" ]