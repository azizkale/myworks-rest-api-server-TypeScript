# STAGE 1: Build
FROM node:16.13.0-alpine AS build
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# STAGE 2: Serve
FROM node:16.13.0-alpine
WORKDIR /usr/src/app

# Copy built files from the build stage
COPY --from=build /usr/src/app/dist /usr/src/app/dist

# Copy node_modules from the build stage
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

# Copy any other necessary files (e.g., package.json)
COPY package.json ./

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
