#!/bin/bash

echo "Starting the build and deployment process..."

# from TypeScript to JavaScript
npm install || { echo 'npm install failed' ; exit 1; }
npm run build || { echo 'npm run build failed' ; exit 1; }

docker build -t easyreadrestful . || true
docker stop easyreadrestful_con || true
docker rm easyreadrestful_con || true

docker run --name easyreadrestful_con -d -p 3001:3001 --rm easyreadrestful:latest

echo "Build and deployment completed successfully."
