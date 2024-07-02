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

# Generate Prisma Client. This needs to be done after the application code is copied, because Prisma Client is generated based on your Prisma schema and your application code. 
# It needs to be done before the application is built, because the generated Prisma Client is used in the application code.
RUN npm run prisma:generate

# Build the Next.js application.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 3001

# Start the Next.js application.
CMD ["npm", "start"]
