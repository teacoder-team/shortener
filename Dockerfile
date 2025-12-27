FROM oven/bun:latest AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY src ./src
COPY prisma.config.ts ./
COPY tsconfig.json ./

RUN bun prisma generate

RUN bun run build

FROM oven/bun:latest AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package.json ./

EXPOSE 14704

CMD ["bun", "dist/server.js"]
