# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a simple HTTP server
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the frontend
CMD ["serve", "-s", "build"]
