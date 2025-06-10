# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
# Pass build-time arguments to the build process
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_API_VERSION
ARG NEXT_PUBLIC_NAME
ARG NEXT_PUBLIC_DUMPER_API_KEY

# Set environment variables for build
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_API_VERSION=$NEXT_PUBLIC_API_VERSION
ENV NEXT_PUBLIC_NAME=$NEXT_PUBLIC_NAME
ENV NEXT_PUBLIC_DUMPER_API_KEY=$NEXT_PUBLIC_DUMPER_API_KEY

RUN npm run build

# Stage 2: Run the app with a lightweight image
FROM node:20-alpine AS runner

WORKDIR /app

# Only copy necessary files from the build stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables for runtime
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_API_VERSION=$NEXT_PUBLIC_API_VERSION
ENV NEXT_PUBLIC_NAME=$NEXT_PUBLIC_NAME
ENV NEXT_PUBLIC_DUMPER_API_KEY=$NEXT_PUBLIC_DUMPER_API_KEY

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]