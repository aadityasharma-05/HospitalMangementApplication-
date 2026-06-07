# HMS - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Install Dependencies (1 minute)
```bash
cd development
npm run install-all
```

### 2. Configure Backend (2 minutes)
```bash
cd backend
# Copy and edit environment file
cp .env.example .env
# Edit backend/.env with your Cloudinary credentials
```

Backend `.env` template:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/hospital_db
JWT_SECRET_KEY=your_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL_ONE=http://localhost:5173
FRONTEND_URL_TWO=http://localhost:5174
```

### 3. Start Services (2 minutes)
```bash
# From root directory
npm run dev

# Or start individually:
npm run dev:backend    # Port 5000
npm run dev:frontend   # Port 5173  
npm run dev:dashboard  # Port 5174
```

---

## 🎯 Test the Application

### Patient Portal
1. Open `http://localhost:5173`
2. Click "Register" → Fill form → Submit
3. Login with your credentials
4. Book an appointment from dashboard

### Admin Dashboard
1. Open `http://localhost:5174`
2. Login with admin credentials (create first as Patient, change role in DB)
3. View appointments, manage doctors

### API Testing
```bash
# Health check
curl http://localhost:5000/health

# Register patient
curl -X POST http://localhost:5000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "phone":"9876543210",
    "Aadhaar_NO":"1234567890123",
    "dob":"1995-05-15",
    "gender":"Male",
    "password":"SecurePass123"
  }'
```

---

## 🐳 Docker Quick Start

### Prerequisites
- Docker Desktop installed

### Run with Docker Compose
```bash
# From root directory
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend

# Stop
docker-compose down
```

---

## 📁 Project Structure at a Glance

```
development/
├── backend/                    # Express API
│   ├── config/config.env      # Environment config
│   ├── controller/            # Business logic
│   ├── models/                # Database schemas
│   ├── router/                # API routes
│   ├── utils/                 # Helpers & utilities
│   ├── app.js                 # Express setup
│   └── server.js              # Server startup
├── frontend/                   # Patient portal (React + Vite)
├── dashboard/                  # Admin dashboard (React + Vite)
├── README.md                   # Full documentation
├── DEPLOYMENT.md               # Cloud deployment guide
├── ARCHITECTURE.md             # System design
├── docker-compose.yml          # Multi-container config
└── .env.example                # Environment template
```

---

## 🔑 Default Test Credentials

### Create Test User
```bash
# Use the registration endpoint to create a test user
# Or import from MongoDB directly

# Test Admin (after registration):
# Email: admin@hospital.com
# Password: Admin@123
# Role: Admin (manually set in database)
```

---

## 🚀 Common Commands

```bash
# Install/Setup
npm run install-all           # Install all dependencies
npm run dev                   # Start all services

# Individual Services
npm run dev:backend          # Start backend only
npm run dev:frontend         # Start frontend only
npm run dev:dashboard        # Start dashboard only

# Building for Production
npm run build                # Build frontend & dashboard

# Linting
npm run lint                 # Run ESLint

# Docker
docker-compose up -d         # Start with Docker
docker-compose logs -f       # View logs
docker-compose down          # Stop services
```

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```bash
# Install MongoDB locally
# macOS:
brew install mongodb-community

# Windows: Download from https://www.mongodb.com/try/download/community

# Or use MongoDB Atlas (cloud)
# Update MONGO_URI in .env to Atlas connection string
```

### Port Already in Use
```bash
# Find and kill process
npx kill-port 5000 5173 5174
```

### CORS Error
- Check `FRONTEND_URL_ONE` and `FRONTEND_URL_TWO` in backend/.env
- They must match your actual frontend URLs

### Cloudinary Errors
- Verify credentials in backend/.env
- Check account at cloudinary.com

---

## 📚 API Base URL
- Development: `http://localhost:5000/api/v1`
- Production: `https://yourdomain.com/api/v1`

---

## 🔗 Key Endpoints

```
Authentication:
POST   /api/v1/user/register          - Register patient
POST   /api/v1/user/login             - Login user
GET    /api/v1/user/logout            - Logout

Doctors:
GET    /api/v1/user/doctors           - List all doctors
POST   /api/v1/user/doctor/addnew    - Add doctor (admin)

Appointments:
GET    /api/v1/appointment            - List appointments
POST   /api/v1/appointment            - Create appointment
PUT    /api/v1/appointment/:id        - Update appointment
DELETE /api/v1/appointment/:id        - Delete appointment

Messages:
POST   /api/v1/message/send           - Send message
GET    /api/v1/message                - Get messages
DELETE /api/v1/message/:id            - Delete message
```

---

## 🎓 Next Steps

1. ✅ Run `npm run dev` and explore the UI
2. ✅ Create test users and appointments
3. ✅ Test admin dashboard features
4. ✅ Review code in `backend/controller` and `backend/models`
5. ✅ Read [DEPLOYMENT.md](DEPLOYMENT.md) for cloud deployment
6. ✅ Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design

---

## 📞 Need Help?

1. Check error logs in terminal
2. Review [DEPLOYMENT.md](DEPLOYMENT.md) for common issues
3. Check [ARCHITECTURE.md](ARCHITECTURE.md) for system understanding
4. Review backend logs: `docker-compose logs -f backend`

---

**Happy coding! 🚀**
