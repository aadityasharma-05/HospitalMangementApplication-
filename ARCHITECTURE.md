# HMS Architecture & Design Document

## System Overview

Hospital Management System is a full-stack web application built with MERN (MongoDB, Express, React, Node.js) architecture. It handles patient appointments, doctor management, and administrative operations.

---

## 🏗️ Architecture

### Monorepo Structure

```
development/
├── backend/          # Node.js + Express API Server
├── frontend/         # React Patient Portal
├── dashboard/        # React Admin Dashboard
├── .github/         # CI/CD pipelines
└── root config files (docker, docs, etc.)
```

### Three-Tier Architecture

```
┌─────────────────────────────────────────────┐
│         Presentation Layer                  │
│  ┌──────────────┐    ┌──────────────┐      │
│  │   Frontend   │    │   Dashboard  │      │
│  │   (React)    │    │   (React)    │      │
│  └──────────────┘    └──────────────┘      │
└─────────────────────────────────────────────┘
           ↕  (Axios HTTP Requests)
┌─────────────────────────────────────────────┐
│      Application Layer (REST API)            │
│  ┌─────────────────────────────────────────┐│
│  │  Express.js Server                      ││
│  │  - Controllers                          ││
│  │  - Middlewares (Auth, Error, Security) ││
│  │  - Routes                               ││
│  │  - Validation & Business Logic          ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
           ↕  (Mongoose ODM)
┌─────────────────────────────────────────────┐
│      Data Layer (Persistence)                │
│  ┌──────────────────────────────────────────┐│
│  │  MongoDB                                 ││
│  │  - Users Collection                      ││
│  │  - Appointments Collection               ││
│  │  - Messages Collection                   ││
│  └──────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────┐│
│  │  Cloudinary (Image Storage)              ││
│  └──────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

---

## 📊 Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  Aadhaar_NO: String,
  dob: Date,
  gender: Enum("Male", "Female"),
  password: String (hashed),
  role: Enum("Patient", "Doctor", "Admin"),
  doctorDepartment: String (only for doctors),
  docAvatar: {
    public_id: String,
    url: String
  },
  createdAt: Date
}
```

### Appointment Schema
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  Aadhaar_NO: String,
  dob: Date,
  gender: String,
  appointment_date: Date,
  department: String,
  doctor_firstName: String,
  doctor_lastName: String,
  hasVisited: Boolean,
  address: String,
  status: Enum("Pending", "Accepted", "Rejected"),
  createdAt: Date
}
```

### Message Schema
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  message: String,
  createdAt: Date
}
```

---

## 🔄 Request Flow

### User Registration Flow
```
Frontend Form
    ↓
POST /api/v1/user/register
    ↓
Frontend.validateInput()
    ↓
Backend.validateUserInput()
    ↓
Backend.checkEmailExists()
    ↓
Backend.hashPassword(bcrypt)
    ↓
Backend.saveUserToMongoDB()
    ↓
Backend.generateJWT()
    ↓
Frontend.storeToken(localStorage)
    ↓
Frontend.redirect(Home)
```

### Appointment Creation Flow
```
Frontend Form
    ↓
POST /api/v1/appointment
    ↓
Backend.validateInput()
    ↓
Backend.checkDoctorExists()
    ↓
Backend.saveAppointment()
    ↓
Response with Appointment ID
    ↓
Frontend.showSuccess()
```

---

## 🔐 Security Architecture

### Authentication (JWT)
- Token issued on login
- Stored in httpOnly cookie + localStorage
- Verified on each protected route
- 7-day expiration

### Authorization
- Role-based access control (RBAC)
- Patient, Doctor, Admin roles
- Protected routes check user role
- Admin-only endpoints for management

### Request Security
- **Rate Limiting**: 100 requests/15min per IP
- **CORS**: Whitelisted domains only
- **Helmet.js**: Security headers
- **Input Validation**: Server-side validation
- **Password Hashing**: bcrypt with salt rounds

### Data Security
- MongoDB requires authentication
- Environment variables for secrets
- Cloudinary API keys protected
- HTTPS/TLS in production

---

## 🚀 API Layer

### Routes Structure

```
/api/v1/
├── /user
│   ├── POST /register        (public)
│   ├── POST /login           (public)
│   ├── GET /logout           (protected)
│   ├── GET /doctors          (public)
│   ├── GET /admin/users      (admin only)
│   ├── POST /admin/addnew    (admin only)
│   └── POST /doctor/addnew   (admin only)
├── /appointment
│   ├── GET /                 (protected)
│   ├── POST /                (protected)
│   ├── PUT /:id              (protected)
│   └── DELETE /:id           (protected)
└── /message
    ├── GET /                 (protected)
    ├── POST /send            (public)
    └── DELETE /:id           (admin only)
```

### Middleware Stack

```
Request
  ↓
Helmet (Security Headers)
  ↓
Rate Limiter
  ↓
CORS
  ↓
Body Parser
  ↓
Cookie Parser
  ↓
Auth Middleware (if protected)
  ↓
Validation Middleware
  ↓
Controller Logic
  ↓
Error Handler
  ↓
Response
```

---

## 🏦 Frontend Architecture

### Component Structure

```
Frontend/
├── Components/
│   ├── AppointmentForm.jsx
│   ├── Biography.jsx
│   ├── Departments.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── MessageForm.jsx
│   └── Navbar.jsx
├── Pages/
│   ├── Home.jsx
│   ├── Appointment.jsx
│   ├── AboutUs.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── Config/
│   ├── api.js          (API endpoints)
│   └── messages.js     (Constants)
├── Utils/
│   └── apiClient.js    (Axios instance)
└── App.jsx

Dashboard/
├── Components/
│   ├── AddNewAdmin.jsx
│   ├── AddNewDoctor.jsx
│   ├── Dashboard.jsx
│   ├── Doctors.jsx
│   ├── Login.jsx
│   ├── Messages.jsx
│   └── Sidebar.jsx
├── Config/
│   ├── api.js
│   └── messages.js
├── Utils/
│   └── apiClient.js
└── App.jsx
```

### State Management
- Local component state (useState)
- LocalStorage for authentication tokens
- Context API ready for future expansion

---

## 🗄️ Database Design

### Indexes for Performance
```javascript
// Recommended indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.appointments.createIndex({ appointment_date: 1 });
db.appointments.createIndex({ doctor_firstName: 1, doctor_lastName: 1 });
db.messages.createIndex({ createdAt: -1 });
```

### Relationships
- Users → Appointments (One-to-Many)
- Doctors → Appointments (One-to-Many)
- Users → Messages (One-to-Many)

---

## 🐳 Docker & Deployment

### Container Architecture
```
Docker Host
├── Backend Container (Node.js)
│   ├── Express Server (Port 5000)
│   └── Logs
├── MongoDB Container
│   └── Data Volume
└── Network Bridge
```

### Environment Isolation
- Development: Local MongoDB, localhost URLs
- Production: MongoDB Atlas, HTTPS URLs
- Docker: Containerized MongoDB, isolated network

---

## 📈 Scalability Considerations

### Current Setup
- Monolithic backend
- Single server instance
- Direct database connection

### For Production Scale
1. **Load Balancing**: Nginx/HAProxy
2. **Database**: MongoDB Atlas with replication
3. **Caching**: Redis for sessions
4. **CDN**: Cloudinary for image delivery
5. **Monitoring**: LogDNA or DataDog
6. **Container Orchestration**: Kubernetes or Docker Swarm

---

## 🔄 Deployment Pipeline

### CI/CD with GitHub Actions
```
Push to GitHub
    ↓
Run Tests & Linting
    ↓
Build Docker Image
    ↓
Push to Registry
    ↓
Deploy to Production
    ↓
Health Checks
    ↓
Smoke Tests
```

---

## 📊 Technology Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.2.0 |
| **Build Tool** | Vite | 5.1.4 |
| **Backend** | Node.js | 18+ |
| **Framework** | Express | 4.18.3 |
| **Database** | MongoDB | 7.0+ |
| **ODM** | Mongoose | 8.2.1 |
| **Auth** | JWT | 9.0.2 |
| **Password** | bcrypt | 5.1.1 |
| **HTTP Client** | Axios | 1.6.7 |
| **Security** | Helmet | 7.1.0 |
| **Rate Limit** | express-rate-limit | 7.1.5 |
| **File Upload** | Cloudinary | 2.0.2 |

---

## 🎯 Design Patterns Used

1. **MVC Pattern**: Separation of Models, Controllers, Routes
2. **Middleware Pattern**: Layered request processing
3. **Singleton Pattern**: Database connection, Cloudinary config
4. **Factory Pattern**: User role creation
5. **Repository Pattern**: Data access abstraction
6. **Error Handling**: Centralized error middleware

---

## 🚦 Performance Metrics

### Targets
- API Response Time: < 200ms
- Frontend Load Time: < 2s
- Database Query Time: < 50ms
- Uptime: 99.5%

### Monitoring
- Server logs: Real-time tracking
- Error rate: Dashboard alerts
- Response times: APM tools
- Database performance: MongoDB Atlas metrics

---

## 📝 Version Control

- **Main Branch**: Production-ready code
- **Develop Branch**: Development/staging
- **Feature Branches**: Feature development (feature/*)
- **Hotfix Branches**: Critical fixes (hotfix/*)

---

## 🔄 Deployment Environments

### Development
- Local MongoDB
- Hot reload enabled
- Debug logs enabled
- CORS: localhost origins

### Staging
- MongoDB Atlas (staging database)
- Build optimization
- Performance monitoring
- Limited logging

### Production
- MongoDB Atlas (production database)
- Minified & optimized code
- Full monitoring & alerting
- HTTPS required
- Rate limiting active

---

## 📋 Checklist for Deployment

- [ ] Environment variables configured
- [ ] JWT secret is strong (32+ chars)
- [ ] MongoDB connection string verified
- [ ] Cloudinary credentials set
- [ ] CORS domains whitelisted
- [ ] HTTPS certificate obtained
- [ ] Database backups configured
- [ ] Monitoring tools set up
- [ ] Error logging enabled
- [ ] Security audit completed

---

**Last Updated**: June 2024  
**Version**: 1.0.0
