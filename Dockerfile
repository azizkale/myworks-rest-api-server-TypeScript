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

# Copy the package files again for installing production dependencies
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the build output from the builder stage
COPY --from=builder /app/dist /app/dist

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]
