# Use the official Node.js image.
FROM node:22.3

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY ./package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the port the app runs on.
EXPOSE 3001

# Start the Next.js application.
CMD ["npm", "run", "dev"]
