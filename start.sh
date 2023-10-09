#!/bin/bash


docker-compose up -d


while [ "$(docker inspect --format='{{.State.Health.Status}}' postgres)" != "healthy" ]; do
  echo "Waiting for Postgres to be ready..."
  sleep 5
done


npm run install:all
npm run migrate:prod
