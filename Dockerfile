### STAGE 1: Build ###
FROM node:16.13.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM node:16.13.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY src/tools/applicationDefault.json /app/applicationDefault.json
RUN npm install --only=production
COPY --from=build /app/dist /app/dist

# Set the environment variables
ENV PORT=3000
COPY .env /app/.env
# Expose the port that the Node.js server listens on
EXPOSE ${PORT}

# Set the command to start the Node.js server
CMD [ "node", "dist/server.js" ]
