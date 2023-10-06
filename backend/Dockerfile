# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate 
RUN npm run compile

ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD /wait-for-it.sh postgres:5432 --timeout=30 -- npx prisma migrate deploy

# If you're using Prisma migrations and want to apply them at build time (optional)


# Base image
FROM node:16-alpine AS final
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Optional: Copy the Prisma schema and any necessary migration files if you did not run migrations in the build stage
# COPY prisma ./prisma

# Expose port
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
