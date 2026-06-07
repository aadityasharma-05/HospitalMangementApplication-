# Hospital Management System (HMS) - Deployment & Setup Guide

## Project Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) Hospital Management System with:
- **Backend**: Node.js + Express API
- **Frontend**: React patient portal
- **Dashboard**: React admin dashboard
- **Database**: MongoDB

---

## 🚀 Quick Start - Development

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

### Setup Development Environment

```bash
# Clone and navigate to project
cd development

# Run setup script (creates .env files)
bash setup-dev.sh

# Or manually:
npm install  # Install root dependencies
npm run install-all  # Install dependencies for all workspaces
```

### Configure Environment Variables

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/hospital_db
JWT_SECRET_KEY=your_secret_key_change_this
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL_ONE=http://localhost:5173
FRONTEND_URL_TWO=http://localhost:5174
```

### Start Development Servers

```bash
# Start all services concurrently
npm run dev

# Or run individually:
npm run dev:backend   # Backend (http://localhost:5000)
npm run dev:frontend  # Frontend (http://localhost:5173)
npm run dev:dashboard # Dashboard (http://localhost:5174)
```

---

## 🐳 Docker Deployment (Recommended)

### Prerequisites
- Docker & Docker Compose installed
- `.env` file in root directory with production values

### Deploy with Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access Services
- Backend API: `http://localhost:5000/api/v1`
- Health Check: `http://localhost:5000/health`
- MongoDB: `localhost:27017`

---

## ☁️ Cloud Deployment Options

### Option 1: AWS EC2 + RDS

```bash
# 1. SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# 2. Install Docker and Docker Compose
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 3. Clone project and setup
git clone <your-repo-url>
cd development
cp .env.example .env
# Edit .env with production values

# 4. Deploy
docker-compose up -d
```

### Option 2: Render.com or Railway.app

1. Create accounts on Render or Railway
2. Create MongoDB database (or use MongoDB Atlas)
3. Deploy backend:
   - Connect your GitHub repository
   - Set environment variables in platform settings
   - Deploy from root with build command: `npm install && npm run install-all`
   - Start command: `npm start`

4. Build and deploy frontends separately:
   - Build command: `npm run build`
   - Output directory: `dist`

### Option 3: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET_KEY=your_secret_key
heroku config:set MONGO_URI=your_mongodb_uri
# ... set all other env variables

# Deploy
git push heroku main
```

---

## 📋 Environment Configuration

### Development (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/hospital_db
JWT_SECRET_KEY=dev_secret_key
FRONTEND_URL_ONE=http://localhost:5173
FRONTEND_URL_TWO=http://localhost:5174
```

### Production (.env)
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/db_name
JWT_SECRET_KEY=long_secure_random_string
CLOUDINARY_CLOUD_NAME=your_production_cloud_name
CLOUDINARY_API_KEY=your_production_api_key
CLOUDINARY_API_SECRET=your_production_api_secret
FRONTEND_URL_ONE=https://yourdomain.com
FRONTEND_URL_TWO=https://admin.yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong JWT secrets (minimum 32 characters)
   - Rotate secrets regularly

2. **MongoDB**
   - Use MongoDB Atlas with IP whitelisting
   - Enable authentication
   - Use connection strings with encryption

3. **API Security**
   - Rate limiting enabled (100 requests/15 min)
   - CORS configured for production domains only
   - Helmet.js for security headers
   - File upload size limits (50MB)

4. **HTTPS/SSL**
   - Always use HTTPS in production
   - Get SSL certificate (Let's Encrypt free option)
   - Use nginx or cloud provider SSL

---

## 📦 API Endpoints

### User Routes (`/api/v1/user`)
- `POST /register` - Patient registration
- `POST /login` - User login
- `GET /logout` - User logout
- `GET /admin/users` - Get all users (admin only)

### Appointment Routes (`/api/v1/appointment`)
- `GET /` - Get all appointments
- `POST /` - Create new appointment
- `PUT /:id` - Update appointment
- `DELETE /:id` - Delete appointment

### Message Routes (`/api/v1/message`)
- `POST /send` - Send message
- `GET /` - Get all messages
- `DELETE /:id` - Delete message

---

## 🔧 Project Structure

```
development/
├── backend/                 # Express server
│   ├── config/             # Configuration files
│   ├── controller/         # Route controllers
│   ├── database/           # Database connection
│   ├── middlewares/        # Express middleware
│   ├── models/             # Mongoose schemas
│   ├── router/             # API routes
│   ├── utils/              # Utilities (logger, validation, security)
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   └── package.json
├── frontend/               # Patient portal (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── Pages/
│   │   └── App.jsx
│   └── package.json
├── dashboard/              # Admin dashboard (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
├── Dockerfile              # Docker image for backend
├── docker-compose.yml      # Multi-container setup
├── deploy.sh               # Production deployment script
├── setup-dev.sh            # Development setup script
├── .env.example            # Environment template
└── package.json            # Root workspace config
```

---

## 📊 Key Features

✅ User Authentication (JWT-based)
✅ Role-based Access Control (Patient, Doctor, Admin)
✅ Appointment Management
✅ Message System
✅ Image Upload (Cloudinary)
✅ Rate Limiting & Security Headers
✅ Error Logging
✅ Input Validation
✅ Docker Deployment Ready

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in .env
- For MongoDB Atlas: verify IP whitelist and connection string

### Port Already in Use
```bash
# Kill process using port 5000
npx kill-port 5000
```

### Docker Issues
```bash
# Clear Docker cache and rebuild
docker-compose down --volumes
docker-compose up -d --build
```

### CORS Errors
- Verify FRONTEND_URL_ONE and FRONTEND_URL_TWO in .env
- Add your domain to CORS whitelist in app.js

---

## 📈 Performance Optimization

1. **Caching**: Implement Redis for session management
2. **Database**: Add indexes to frequently queried fields
3. **CDN**: Use Cloudinary CDN for image delivery
4. **Compression**: gzip compression enabled in production
5. **Load Balancing**: Use nginx or cloud load balancer

---

## 🔄 CI/CD Pipeline (Recommended)

Set up GitHub Actions for automated deployment:

1. Run tests on every push
2. Build Docker image
3. Push to Docker registry
4. Deploy to cloud platform

---

## 📞 Support & Maintenance

- Regular dependency updates: `npm update`
- Monitor server logs: `docker-compose logs -f backend`
- Database backups: Configure MongoDB Atlas backups
- Security patches: Keep dependencies current

---

## 📝 License

ISC License - See LICENSE file for details

---

**Last Updated**: 2024
**Version**: 1.0.0
