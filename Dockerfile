FROM node:20-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
ADD package.json .
ADD package-lock.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
