# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# ---- Build Stage ----
FROM base AS build
WORKDIR /app
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production
WORKDIR /app

# Copy only required files
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build output
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

# Next.js runs on port 3000 by default
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]

