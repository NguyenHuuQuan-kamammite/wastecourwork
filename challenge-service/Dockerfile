# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the service runs on (replace 3000 if your server uses a different port)
EXPOSE 3000

# Define environment variables if necessary
# ENV NODE_ENV=production
# ENV JWT_SECRET=your_secret_key
# ENV MONGO_URI=mongodb://your_mongo_db_url

# Run the server
CMD ["node", "server.js"]
