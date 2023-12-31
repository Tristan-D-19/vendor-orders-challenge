# vendor-orders-challenge
current time: 1:30 PM Friday, October 6, 2023 (EDT) Time in New York, NY

Time estimate: 4 hours.

## Prerequisites
### Dependencies: Docker, Postgresql
Ensure you have Docker installed. If not, please follow instructions from Docker's official website.

## Running with Docker
on the first run of the services I have added a helper script

Linux/Unix
```bash
chmod +x start.sh
./start.sh
```

Windows:
```bat
./start.bat
```

To Manually Start the Services:
```bash
docker-compose up
```
## NOTE you MUST run the following command *after* the services have started:

```bash
npm run install:all
npm run migrate:prod
```

Stop the Services:

```bash
docker-compose down
```


## Running Without Docker
If docker does not work or run on your machine:
1. Run PostgreSQL locally.
2. Start the services:
```bash
npm run install:all
npm run migrate:prod
npm run start:all
```



## Environment Variables
For this example, environment variables are included in the docker-compose.yaml. Usually, these are kept private.


## Access the App
Frontend: http://localhost:8000
Backend: http://localhost:3000


