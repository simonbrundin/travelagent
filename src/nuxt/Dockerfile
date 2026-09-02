# ==============================
# Build Stage
# ==============================
FROM node:lts-alpine AS build
WORKDIR /app

# Installera dependencies
RUN apk add --no-cache python3 make g++ gcc

# Kopiera package files
COPY package.json ./

# Installera node_modules
RUN npm ci

# Kopiera källkod
COPY . .

# Bygg applikationen
RUN npm run build

# ==============================
# Runtime Stage
# ==============================
FROM node:22-alpine AS production

WORKDIR /app

# Installera dumb-init för korrekt signalhantering
RUN apk add --no-cache dumb-init

# Skapa non-root användare
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxt -u 1001

# Kopiera byggoutput
COPY --from=build --chown=nuxt:nodejs /app/.output ./production

# Sätt ägarskap
RUN chown -R nuxt:nodejs /app

USER nuxt

# Exponera port
EXPOSE 3000

# Environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Startkommando
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "production/server/index.mjs"]
