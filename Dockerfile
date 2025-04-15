# Dockerfile
FROM node:23-slim

# Create app directory
WORKDIR /api

# Install dependencies
COPY ./backend/package*.json ./
RUN npm install

# Copy source code
COPY ./backend .

# Development
RUN npm install -g nodemon

# Run app with nodemon
CMD ["nodemon", "index.js"]
