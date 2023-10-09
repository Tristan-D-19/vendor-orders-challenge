@echo off

REM 
docker-compose up -d

REM 
:waitloop
FOR /F "tokens=*" %%i IN ('docker inspect --format="{{.State.Health.Status}}" postgres') DO SET STATUS=%%i
IF "%STATUS%" NEQ "healthy" (
    echo Waiting for Postgres to be ready...
    TIMEOUT /T 5
    GOTO waitloop
)

REM 
npm run install:all
npm run migrate:prod
