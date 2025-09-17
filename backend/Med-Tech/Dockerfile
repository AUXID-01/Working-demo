# Use a specific and slim Node.js base image
FROM node:20.9.0-bullseye-slim

# Set environment for production
ENV NODE_ENV production

# Working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install only production dependencies first, to leverage Docker caching
COPY package*.json ./
RUN npm ci --only=production

# Copy the source code last (after dependencies for efficient Docker layer caching)
COPY . .

# Expose the port your Node app runs on (change if needed)
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]
