# syntax=docker/dockerfile:1.7

# ---- builder ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json .npmrc ./
RUN npm install --no-package-lock

COPY nx.json tsconfig.base.json ./
COPY frontend ./frontend
COPY shared ./shared

RUN npx nx build shell --configuration=production

# ---- runtime ----
FROM nginx:1.27-alpine AS runtime

COPY frontend/apps/shell/nginx.conf.template /etc/nginx/templates/default.conf.template

COPY --from=builder /app/dist/frontend/apps/shell/browser /usr/share/nginx/html

ENV BFF_HOST=bff
ENV BFF_PORT=3000
ENV NGINX_ENVSUBST_FILTER="^BFF_"

EXPOSE 80
