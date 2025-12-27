FROM oven/bun:1.1.8 AS base
WORKDIR /app

FROM base AS deps

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY src ./src
COPY prisma.config.ts ./
COPY tsconfig.json ./

RUN bunx prisma generate

RUN bun build src/server.ts --outdir dist

FROM oven/bun:1.1.8-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package.json ./

EXPOSE 14704

CMD ["bun", "dist/server.js"]
