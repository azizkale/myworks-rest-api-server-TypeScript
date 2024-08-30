#!/bin/bash

# echo "Starting the build and deployment process..."

# sudo docker build -t easyreadrestful . || true
# sudo docker stop easyreadrestful_con || true
# sudo docker rm easyreadrestful_con || true

# sudo docker run --name easyreadrestful_con -d -p 3001:3001 --rm easyreadrestful:latest

# echo "Build and deployment completed successfully."
#!/bin/bash

echo "Starting the build and deployment process with Docker Compose..."

# Projeyi Docker Compose ile build edin ve başlatın
docker-compose up -d --build

echo "Build and deployment completed successfully."
