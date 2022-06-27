FROM node:16.15.1-slim

ARG REACT_APP_CONFIG_HOST
ARG REACT_APP_ADAPTER_HOST

RUN mkdir -p /temp
WORKDIR /temp

COPY package*.json ./
RUN npm clean-install --legacy-peer-deps

COPY public/ ./public/
COPY src/ ./src/
RUN npm run-script build

ENTRYPOINT [ "npx", "serve", "-s", "build" ]
