# Builder stage
FROM node:14-alpine AS builder

WORKDIR /app

# Copy only package files and install dependencies
COPY package.json package-lock.json ./

# Create a directory for tools and copy the applicationDefault.json
RUN mkdir -p ./dist/tools/

RUN npm install

# Copy the entire project and build
COPY . .

RUN npm run build

# Server stage
FROM node:14-alpine AS server

WORKDIR /app
COPY package.json package-lock.json ./


# Copy the environment file
# COPY .env .env

# Install only production dependencies
RUN npm install --only=production
COPY --from=builder /app/dist /app/dist

COPY . .
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]
