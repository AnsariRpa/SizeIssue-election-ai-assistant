# Use official lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY . .

# Cloud Run sets the PORT environment variable. Ensure app listens on it.
ENV PORT 8080

# Run the web service on container startup
CMD [ "node", "server.js" ]
