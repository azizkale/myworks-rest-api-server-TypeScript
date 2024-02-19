#!/bin/bash
echo "start"

# Build the Docker image
docker build -t easyreadrestful . || { echo "Docker build failed"; exit 1; }

# Stop the existing container if it's running
docker stop easyreadrestful || true

# Run the Docker container
docker run --name easyreadrestful -d -p 3000:3000 --rm easyreadrestful:latest || { echo "Docker run failed"; exit 1; }

echo "end"
