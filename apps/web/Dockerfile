FROM node:lts-alpine AS build

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . ./

RUN pnpm run build

FROM caddy

WORKDIR /app

COPY Caddyfile ./

RUN caddy fmt Caddyfile --overwrite

COPY --from=build /app/dist ./dist

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]