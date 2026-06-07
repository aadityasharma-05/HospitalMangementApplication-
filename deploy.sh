#!/bin/bash

# Production deployment script for HMS

set -e

echo "🚀 Starting HMS Production Deployment..."

# Check environment variables
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it from .env.example"
    exit 1
fi

echo "📦 Building Docker image..."
docker build -t hms-app:latest .

echo "🔄 Stopping existing containers..."
docker-compose down || true

echo "🎯 Starting services with docker-compose..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 5

echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "📋 Next steps:"
echo "1. Check logs: docker-compose logs -f backend"
echo "2. Access API: http://localhost:5000/api/v1"
echo "3. Health check: http://localhost:5000/health"
