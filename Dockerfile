# Use the latest version of Node.js available on Docker Hub
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite.js front end
RUN npm run dev

# Expose the port the app runs on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
