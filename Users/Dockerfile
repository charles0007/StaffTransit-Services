# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=prod

# Copy the rest of the application code
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port the application is running on
EXPOSE 89

# Set the command to run when the container starts
CMD ["npm", "start"]
