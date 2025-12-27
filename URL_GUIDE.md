# Rider App - Complete URL Guide

## 🌐 Frontend URLs (React + Vite)
**Base URL:** `http://localhost:5173`

### 📄 Public Pages
- **Home:** http://localhost:5173/
- **About:** http://localhost:5173/about
- **Features:** http://localhost:5173/features
- **Contact:** http://localhost:5173/contact
- **FAQ:** http://localhost:5173/faq

### 🔐 Authentication Pages
- **Login:** http://localhost:5173/login
- **Register:** http://localhost:5173/register

### 👤 Rider Dashboard
- **Dashboard Home:** http://localhost:5173/dashboard/rider
- **Ride History:** http://localhost:5173/dashboard/rider/history
- **Profile Settings:** http://localhost:5173/dashboard/rider/profile

### 🚗 Driver Dashboard
- **Dashboard Home:** http://localhost:5173/dashboard/driver
- **Ride Requests:** http://localhost:5173/dashboard/driver/requests
- **Earnings:** http://localhost:5173/dashboard/driver/earnings
- **Documents:** http://localhost:5173/dashboard/driver/documents
- **Ride History:** http://localhost:5173/dashboard/driver/history
- **Reviews:** http://localhost:5173/dashboard/driver/reviews
- **Profile Settings:** http://localhost:5173/dashboard/driver/profile

### 👨‍💼 Admin Dashboard
- **Dashboard Home:** http://localhost:5173/dashboard/admin
- **User Management:** http://localhost:5173/dashboard/admin/users
- **Ride Management:** http://localhost:5173/dashboard/admin/rides
- **Disputes:** http://localhost:5173/dashboard/admin/disputes
- **Analytics:** http://localhost:5173/dashboard/admin/analytics
- **Settings:** http://localhost:5173/dashboard/admin/settings

### ❌ Error Pages
- **404 Not Found:** http://localhost:5173/any-invalid-url

---

## 🔧 Backend API URLs (Node.js + Express)
**Base URL:** `http://localhost:5000`

### 🏥 Health Check
- **GET** http://localhost:5000/api/health
  - Returns API status

### 🔐 Authentication Endpoints
**Base:** `/api/auth`

- **POST** http://localhost:5000/api/auth/register
  - Register new user (rider, driver, or admin)
  - Body: `{ "name": "string", "email": "string", "password": "string", "role": "rider|driver|admin" }`

- **POST** http://localhost:5000/api/auth/login
  - Login existing user
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: JWT token

### 🚕 Ride Endpoints
**Base:** `/api/rides`
**Auth Required:** Yes (JWT token)

- **GET** http://localhost:5000/api/rides
  - Get all rides for authenticated user
  - Headers: `Authorization: Bearer <token>`

- **POST** http://localhost:5000/api/rides/estimate
  - Get ride fare estimate (Riders only)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "pickup": "string", "dropoff": "string" }`

- **POST** http://localhost:5000/api/rides/request
  - Request a new ride (Riders only)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "pickup": "string", "dropoff": "string", "vehicleType": "string" }`

- **PUT** http://localhost:5000/api/rides/:id/accept
  - Accept a ride request (Drivers only)
  - Headers: `Authorization: Bearer <token>`
  - Params: `id` - Ride ID

- **PUT** http://localhost:5000/api/rides/:id/status
  - Update ride status (Drivers only)
  - Headers: `Authorization: Bearer <token>`
  - Params: `id` - Ride ID
  - Body: `{ "status": "accepted|arrived|started|completed|cancelled" }`

### 👥 User Endpoints
**Base:** `/api/users`
**Auth Required:** Yes (JWT token)

- **GET** http://localhost:5000/api/users/profile
  - Get authenticated user's profile
  - Headers: `Authorization: Bearer <token>`

- **PUT** http://localhost:5000/api/users/profile
  - Update user profile
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "string", "phone": "string", "avatar": "string" }`

- **GET** http://localhost:5000/api/users/driver/stats
  - Get driver statistics (Drivers only)
  - Headers: `Authorization: Bearer <token>`

- **GET** http://localhost:5000/api/users/admin/analytics
  - Get platform analytics (Admins only)
  - Headers: `Authorization: Bearer <token>`

- **PUT** http://localhost:5000/api/users/:id/status
  - Manage user status - activate/deactivate (Admins only)
  - Headers: `Authorization: Bearer <token>`
  - Params: `id` - User ID
  - Body: `{ "status": "active|suspended|banned" }`

---

## 📋 Quick Reference

### Frontend Development Server
```bash
cd frontend
npm run dev
```
Access at: **http://localhost:5173**

### Backend API Server
```bash
cd backend
npm run dev
```
Access at: **http://localhost:5000**

---

## 🧪 Testing Endpoints

### Using cURL

**Register a new rider:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"rider"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get ride estimate:**
```bash
curl -X POST http://localhost:5000/api/rides/estimate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"pickup":"Times Square, NYC","dropoff":"Central Park, NYC"}'
```

**Health check:**
```bash
curl http://localhost:5000/api/health
```

---

## 🔑 Authentication Flow

1. **Register** at http://localhost:5173/register
2. **Login** at http://localhost:5173/login
3. **Receive JWT token** stored in localStorage
4. **Token auto-attached** to all API requests via Redux RTK Query
5. **Access protected routes** based on user role

---

## 🎯 User Roles & Access

| Role | Frontend Access | API Access |
|------|----------------|------------|
| **Rider** | Public pages + Rider dashboard | All public + rider-specific endpoints |
| **Driver** | Public pages + Driver dashboard | All public + driver-specific endpoints |
| **Admin** | Public pages + Admin dashboard | All public + admin-specific endpoints |

---

## 📦 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/riderapp
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

---

## 🚀 Production URLs (When Deployed)

**Frontend:** https://rider-app-frontend-one.vercel.app
**Backend:** (Configure based on your hosting)

---

## ✅ Status

Both servers are currently running:
- ✅ **Frontend:** http://localhost:5173 (Active)
- ✅ **Backend:** http://localhost:5000 (Active)

All URLs are ready for testing!
