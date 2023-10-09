# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run compile

ARG DATABASE_URL


ENV DATABASE_URL=$DATABASE_URL

ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD /wait-for-it.sh postgres:5432 --timeout=30 -- npx prisma migrate deploy




# Base image
FROM node:16-alpine AS final
WORKDIR /app
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./



# Expose port
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
