# Use the official Node.js image as a base image
FROM node:16


WORKDIR /app


COPY package*.json ./

RUN npm install


COPY . ./


EXPOSE 8000


CMD ["npm", "run", "dev"]
