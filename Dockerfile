# Use the official Node.js image as the base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY agent-frontend/package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire React application code
COPY agent-frontend/ .

# Build the React app for production
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]