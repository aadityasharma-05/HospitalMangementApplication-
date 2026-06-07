#!/bin/bash

# Local development setup script for HMS

set -e

echo "🔧 Setting up HMS Development Environment..."

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm run install-all

# Create environment files if they don't exist
echo ""
echo "📝 Setting up environment files..."

if [ ! -f backend/.env ]; then
    echo "Creating backend/.env from .env.example..."
    cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env ]; then
    echo "Creating frontend/.env from .env.example..."
    cp frontend/.env.example frontend/.env
fi

if [ ! -f dashboard/.env ]; then
    echo "Creating dashboard/.env from .env.example..."
    cp dashboard/.env.example dashboard/.env
fi

echo ""
echo "✅ Setup completed!"
echo ""
echo "🚀 To start development:"
echo "   npm run dev"
echo ""
echo "📚 To run specific services:"
echo "   npm run dev:backend  (Backend on http://localhost:5000)"
echo "   npm run dev:frontend (Frontend on http://localhost:5173)"
echo "   npm run dev:dashboard (Dashboard on http://localhost:5174)"
