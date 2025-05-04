FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# Ensure next is installed
# RUN npm install next

# COPY --from=builder /app/.next /app/.next
# COPY --from=builder /app/public /app/public
# # COPY --from=builder /app/node_modules /app/node_modules
# COPY --from=builder /app/package.json /app/

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

# CMD ["node", ".next/standalone/server.js"]
CMD HOSTNAME='0.0.0.0' node server.js
# CMD ["node", "server.js", "--hostname", "0.0.0.0"]
