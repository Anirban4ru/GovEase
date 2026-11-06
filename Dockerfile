# ==============================================================================
# Unified Life Services Platform - Production Container Image
# Multi-stage build, unprivileged non-root user, minimal zero-dependency runtime
# ==============================================================================

# Stage 1: Build static application assets
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies deterministically
COPY package.json package-lock.json ./
RUN npm ci

# Copy project source files
COPY tsconfig.json next.config.ts ./
COPY catalogue ./catalogue
COPY public ./public
COPY scripts ./scripts
COPY src ./src

# Build catalogue and Next.js static export (outputs to out/)
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Minimal hardened unprivileged runtime
FROM node:22-alpine AS runner

WORKDIR /app

# Ensure non-root unprivileged execution (user 'node', uid 1000)
USER node

# Copy static server and pre-built static export
COPY --chown=node:node scripts/static-server.mjs ./scripts/static-server.mjs
COPY --chown=node:node --from=builder /app/out ./out

# Expose HTTP port
EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

# Integrated healthcheck using native node http
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); const req = http.get('http://localhost:3000/', (res) => process.exit(res.statusCode === 200 ? 0 : 1)); req.on('error', () => process.exit(1));"

# Launch static server with audited security headers
CMD ["node", "scripts/static-server.mjs", "3000"]
