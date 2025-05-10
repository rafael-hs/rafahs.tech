# syntax=docker/dockerfile:1.4

########################################
# Stage 1: Builder (Node + BuildKit cache)
########################################
FROM node:16-alpine AS builder
WORKDIR /app

# (Opcional) cache de dependências em BuildKit:
# RUN --mount=type=cache,target=/app/node_modules \
COPY package*.json ./
RUN npm ci --silent

COPY . .
RUN npm run build -- --configuration production

########################################
# Stage 2: Runtime (Caddy)
########################################
FROM caddy:2-alpine

# Copia o conteúdo do build para /srv
COPY --from=builder /app/dist/rafahs-tech /srv

# Configuração do Caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443
