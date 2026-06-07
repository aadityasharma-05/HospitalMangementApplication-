FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json* ./

# Copy backend
COPY backend ./backend

# Install dependencies
RUN npm install

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the server
CMD ["npm", "start"]
