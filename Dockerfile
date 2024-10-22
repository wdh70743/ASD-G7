# Use Node.js LTS version as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code to the container
COPY . .

# Build the React application
RUN npm run build

# Set the HOST environment variable
ENV HOST=0.0.0.0

EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
