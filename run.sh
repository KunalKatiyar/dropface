#!/bin/bash

# Exit script on error
set -e

# Set MAVEN_OPTS to handle module issues
export MAVEN_OPTS="--add-opens java.base/java.lang=ALL-UNNAMED"

echo "Starting backend setup..."

# Navigate to the backend directory
cd backend

# Build the Spring Boot application
echo "Building backend application..."
mvn clean install

# Start the MySQL Docker container
echo "Starting MySQL Docker container..."
sudo docker-compose up -d

# Run the Spring Boot application
echo "Running backend application..."
mvn spring-boot:run &

# Save the backend process ID
BACKEND_PID=$!

# Navigate back to the root directory
cd ..

echo "Starting frontend setup..."

# Navigate to the frontend directory
cd frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Run the Next.js application
echo "Running frontend application..."
npm run dev &

# Save the frontend process ID
FRONTEND_PID=$!

# Wait for the user to terminate the script
echo "Both backend and frontend are running. Press [CTRL+C] to stop."

# Trap CTRL+C and clean up
trap 'echo "Stopping applications..."; kill $BACKEND_PID $FRONTEND_PID; exit 0' SIGINT

# Wait indefinitely
wait
