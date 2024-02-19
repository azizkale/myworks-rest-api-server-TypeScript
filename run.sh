#!/bin/bash

echo "Starting the build and deployment process..."

docker build -t easyreadrestful . || true

docker stop easyreadrestful_con || true


docker run --name easyreadrestful_con -d -p 3000:3000 --rm easyreadrestful:latest

echo "Build and deployment completed successfully."
