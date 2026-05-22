# syntax=docker/dockerfile:1.7

# ---- builder ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json .npmrc ./
RUN npm install --no-package-lock

COPY nx.json tsconfig.base.json ./
COPY backend ./backend
COPY shared ./shared

RUN npx nx build bff --configuration=production

# ---- runtime ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package.json .npmrc ./
RUN npm install --no-package-lock --omit=dev --ignore-scripts && npm cache clean --force

COPY --from=builder /app/dist/backend/apps/bff ./bff

COPY --from=builder /app/dist/shared ./node_modules/@target

EXPOSE 3000
CMD ["node", "bff/src/main.js"]
