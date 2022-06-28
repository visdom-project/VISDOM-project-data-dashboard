FROM node:16.15.1-slim AS builder

ARG REACT_APP_CONFIG_HOST
ARG REACT_APP_ADAPTER_HOST

RUN mkdir -p /temp
WORKDIR /temp

COPY package*.json ./
RUN npm clean-install --legacy-peer-deps

COPY public/ ./public/
COPY src/ ./src/
RUN npm run-script build


FROM node:16.15.1-slim
COPY --from=builder /temp/build /node-build

ENTRYPOINT [ "npx", "serve", "-s", "/node-build" ]
