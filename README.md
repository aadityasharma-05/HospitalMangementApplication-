# Hospital Management System - README

## Overview

A comprehensive **MERN Stack Hospital Management System** for managing patient appointments, doctor profiles, and administrative operations.

### 🎯 Features

- **Patient Portal**: Register, login, book appointments, send messages
- **Doctor Dashboard**: View appointments, manage profiles, respond to messages
- **Admin Panel**: Manage users, doctors, appointments, and system settings
- **Real-time Updates**: Instant appointment and message notifications
- **Secure Authentication**: JWT-based authentication with role-based access
- **Image Upload**: Cloudinary integration for doctor profiles and documents
- **Responsive Design**: Mobile-friendly UI with React and Vite

### 📱 User Roles

1. **Patient**: View appointments, doctors, book appointments, send messages
2. **Doctor**: Manage appointments, profile, view messages
3. **Admin**: Full system management, user management, analytics

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Cloudinary + express-fileupload
- **Security**: Helmet.js, express-rate-limit, CORS

### Frontend & Dashboard
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS3
- **Routing**: React Router v6
- **UI Components**: React Icons, React Toastify

---

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas cloud)
- Cloudinary account (for image uploads)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd development

# Install all dependencies
npm run install-all
```

### 2. Environment Setup

```bash
# Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp dashboard/.env.example dashboard/.env

# Edit backend/.env with your configurations
```

### 3. Configure Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/hospital_db
JWT_SECRET_KEY=your_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL_ONE=http://localhost:5173
FRONTEND_URL_TWO=http://localhost:5174
```

### 4. Start Development

```bash
# Start all services
npm run dev

# Or start individually:
npm run dev:backend    # Port 5000
npm run dev:frontend   # Port 5173
npm run dev:dashboard  # Port 5174
```

---

## 🐳 Docker Deployment

### Quick Docker Start

```bash
# Build and run with Docker Compose
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
```

### Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed cloud deployment instructions.

---

## 📂 Project Structure

```
development/
├── backend/
│   ├── config/              # Environment & configurations
│   ├── controller/          # API controllers
│   ├── database/            # MongoDB connection
│   ├── middlewares/         # Auth, error handling
│   ├── models/              # Mongoose schemas
│   ├── router/              # API routes
│   ├── utils/               # Helpers (logger, validation, security)
│   ├── app.js               # Express configuration
│   └── server.js            # Server startup
├── frontend/                # Patient portal
│   └── src/components/      # React components
├── dashboard/               # Admin dashboard
│   └── src/components/      # React components
└── docker-compose.yml       # Multi-container setup
```

---

## 🔌 API Documentation

### Base URL
- Development: `http://localhost:5000/api/v1`
- Production: `https://yourdomain.com/api/v1`

### Authentication Endpoints

**Register Patient**
```
POST /user/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "Aadhaar_NO": "1234567890123",
  "dob": "1995-05-15",
  "gender": "Male",
  "password": "SecurePass123"
}
```

**Login**
```
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "role": "Patient"
}
```

### Appointment Endpoints

**Get All Appointments**
```
GET /appointment/
```

**Create Appointment**
```
POST /appointment/
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "Aadhaar_NO": "1234567890123",
  "dob": "1995-05-15",
  "gender": "Male",
  "appointment_date": "2024-06-15",
  "department": "Cardiology",
  "doctor_firstName": "Dr. Smith",
  "doctor_lastName": "Johnson",
  "hasVisited": false,
  "address": "123 Main St"
}
```

---

## 🔒 Security Features

✅ **JWT Authentication** - Secure token-based authentication
✅ **Rate Limiting** - 100 requests per 15 minutes
✅ **CORS Protection** - Whitelisted frontend domains
✅ **Helmet.js** - Security headers protection
✅ **Input Validation** - Server-side validation
✅ **Password Hashing** - bcrypt encryption
✅ **HTTPS Ready** - Production SSL/TLS support

---

## 📊 Database Schema

### User Schema
- firstName, lastName
- email (unique)
- phone, Aadhaar_NO
- dob, gender
- password (encrypted)
- role (Patient/Doctor/Admin)
- docAvatar (Cloudinary)
- doctorDepartment (for doctors)

### Appointment Schema
- Patient details
- Doctor selection
- Appointment date & time
- Department
- Status (Pending/Accepted/Rejected)
- Medical history

### Message Schema
- Sender information
- Subject & message
- Timestamp
- Status

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update `.env` with production values
- [ ] Set strong JWT_SECRET_KEY
- [ ] Configure MongoDB Atlas cluster
- [ ] Setup Cloudinary account
- [ ] Configure CORS for production domains
- [ ] Build frontend & dashboard: `npm run build`
- [ ] Test all API endpoints
- [ ] Setup SSL/HTTPS certificate
- [ ] Configure domain and DNS
- [ ] Setup monitoring and logging
- [ ] Database backup strategy
- [ ] Security audit complete

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongod

# Or use MongoDB Atlas connection string
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

### Port Already in Use
```bash
# Kill process on port
npx kill-port 5000 5173 5174
```

### CORS Errors
Check `FRONTEND_URL_ONE` and `FRONTEND_URL_TWO` in `.env`

### Image Upload Issues
Verify Cloudinary credentials in `.env`

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Cloudinary Docs](https://cloudinary.com/documentation)

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

ISC License

---

## 📞 Support

For issues and questions:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
2. Review API endpoints in this README
3. Check browser console for frontend errors
4. Review server logs with: `docker-compose logs -f backend`

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Status**: Production Ready ✅
