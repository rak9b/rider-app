# 🔐 Rider App - Authentication System & Test Credentials

## 🎯 Test User Credentials

### 👤 **RIDER ACCOUNTS**

#### Account #1 (Primary Rider)
```
Email:    rider@riderapp.com
Password: rider123
Role:     Rider
Name:     John Rider
Phone:    +1 (555) 100-0001
```

#### Account #2 (Secondary Rider)
```
Email:    sarah.rider@riderapp.com
Password: rider123
Role:     Rider
Name:     Sarah Rider
Phone:    +1 (555) 100-0004
```

---

### 🚗 **DRIVER ACCOUNTS**

#### Account #1 (Standard Driver)
```
Email:    driver@riderapp.com
Password: driver123
Role:     Driver
Name:     Mike Driver
Phone:    +1 (555) 200-0002
Vehicle:  Toyota Camry 2022
Plate:    ABC-1234
Type:     Car
Status:   Online
```

#### Account #2 (Standard Driver)
```
Email:    tom.driver@riderapp.com
Password: driver123
Role:     Driver
Name:     Tom Driver
Phone:    +1 (555) 200-0005
Vehicle:  Honda Accord 2023
Plate:    XYZ-5678
Type:     Car
Status:   Offline
```

#### Account #3 (Premium Driver)
```
Email:    emma.driver@riderapp.com
Password: driver123
Role:     Driver
Name:     Emma Premium Driver
Phone:    +1 (555) 200-0006
Vehicle:  Tesla Model S 2024
Plate:    TES-9999
Type:     Premium
Status:   Online
Rating:   5.0 ⭐
```

---

### 👨‍💼 **ADMIN ACCOUNT**

```
Email:    admin@riderapp.com
Password: admin123
Role:     Admin
Name:     Admin User
Phone:    +1 (555) 300-0003
```

---

## 🔑 Authentication System Overview

### **Technology Stack**
- **Password Hashing:** bcryptjs (10 salt rounds)
- **Token:** JWT (JSON Web Tokens)
- **Middleware:** Custom auth & role-based authorization
- **Storage:** MongoDB (or mock mode for development)

### **Security Features**
✅ Password encryption with bcrypt  
✅ JWT-based authentication  
✅ Role-based access control (RBAC)  
✅ Account status management (active/blocked/suspended)  
✅ Protected routes with middleware  
✅ Token expiration (30 days)  
✅ Password minimum length (6 characters)  
✅ Email validation  

---

## 📝 How to Use Test Credentials

### **Option 1: Quick Login (Frontend)**

1. **Start both servers:**
   ```bash
   # Terminal 1 - Frontend
   cd frontend
   npm run dev
   
   # Terminal 2 - Backend
   cd backend
   npm run dev
   ```

2. **Visit login page:**
   ```
   http://localhost:5173/login
   ```

3. **Choose a test account and login:**
   - **Rider:** rider@riderapp.com / rider123
   - **Driver:** driver@riderapp.com / driver123
   - **Admin:** admin@riderapp.com / admin123

4. **You'll be automatically redirected to the appropriate dashboard!**

---

### **Option 2: API Testing (Backend)**

#### **Login via API:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rider@riderapp.com",
    "password": "rider123"
  }'
```

#### **Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Rider",
  "email": "rider@riderapp.com",
  "role": "rider",
  "status": "active",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Use Token for Protected Routes:**
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🔒 Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. User enters email & password                        │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  2. POST /api/auth/login                                │
│     - Email & password sent to backend                  │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  3. Backend validates credentials                       │
│     - Finds user by email                               │
│     - Compares hashed password with bcrypt              │
│     - Checks account status (active/blocked/suspended)  │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  4. Generate JWT Token                                  │
│     - Contains user ID                                  │
│     - Expires in 30 days                                │
│     - Signed with secret key                            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  5. Return user data + token                            │
│     - _id, name, email, role, status, token             │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  6. Frontend stores token                               │
│     - Saved in localStorage                             │
│     - Saved in Redux store                              │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  7. Redirect to role-based dashboard                    │
│     - Rider: /dashboard/rider                           │
│     - Driver: /dashboard/driver                         │
│     - Admin: /dashboard/admin                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🛡️ Role-Based Access Control

### **Rider Permissions**
- ✅ View public pages
- ✅ Request rides
- ✅ View ride history
- ✅ Update profile
- ✅ Rate drivers
- ❌ Accept ride requests
- ❌ Access admin panel

### **Driver Permissions**
- ✅ View public pages
- ✅ Accept ride requests
- ✅ Update ride status
- ✅ View earnings
- ✅ Update profile
- ✅ Upload documents
- ✅ View driver statistics
- ❌ Request rides as rider
- ❌ Access admin panel

### **Admin Permissions**
- ✅ Everything riders and drivers can do
- ✅ View all users
- ✅ Manage user status (block/suspend)
- ✅ View all rides
- ✅ Handle disputes
- ✅ View platform analytics
- ✅ System configuration

---

## 🔧 Backend Middleware

### **1. Authentication Middleware (`protect`)**
```typescript
// Verifies JWT token
// Attaches user to request object
// Used on all protected routes
```

**Usage:**
```typescript
router.use(protect); // All routes below require authentication
```

### **2. Authorization Middleware (`authorize`)**
```typescript
// Checks user role
// Ensures user has required permission
// Returns 403 if unauthorized
```

**Usage:**
```typescript
router.post('/request', authorize('rider'), requestRide);
router.put('/:id/accept', authorize('driver'), acceptRide);
router.get('/admin/analytics', authorize('admin'), getAdminAnalytics);
```

---

## 🚀 Seeding Test Users (Optional)

If you're using MongoDB, you can seed the database with test users:

### **Run Seeder:**
```bash
cd backend
npm run seed
```

### **Add to package.json:**
```json
{
  "scripts": {
    "seed": "tsx src/seed.ts"
  }
}
```

This will:
- ✅ Clear existing users
- ✅ Create 6 test users (2 riders, 3 drivers, 1 admin)
- ✅ Hash all passwords
- ✅ Display credentials in console

---

## 📱 Frontend Login Process

### **Redux Integration**
- Token stored in Redux `authSlice`
- Persisted in `localStorage`
- Auto-attached to API requests via RTK Query
- Auto-logout on token expiration

### **Protected Routes**
```typescript
// ProtectedRoute component checks:
// 1. Is user authenticated? (token exists)
// 2. Does user have required role?
// 3. If not, redirect to login
```

---

## 🧪 Testing Authentication

### **Test Case 1: Successful Login**
```bash
POST http://localhost:5000/api/auth/login
Body: { "email": "rider@riderapp.com", "password": "rider123" }
Expected: 200 OK + JWT token
```

### **Test Case 2: Invalid Credentials**
```bash
POST http://localhost:5000/api/auth/login
Body: { "email": "rider@riderapp.com", "password": "wrong" }
Expected: 401 Unauthorized
```

### **Test Case 3: Blocked Account**
```bash
POST http://localhost:5000/api/auth/login
Body: { "email": "blocked@example.com", "password": "password123" }
Expected: 403 Forbidden
```

### **Test Case 4: Access Protected Route**
```bash
GET http://localhost:5000/api/users/profile
Headers: Authorization: Bearer <valid_token>
Expected: 200 OK + User profile
```

### **Test Case 5: Access Without Token**
```bash
GET http://localhost:5000/api/users/profile
Headers: (no Authorization header)
Expected: 401 Unauthorized
```

### **Test Case 6: Role-Based Access**
```bash
GET http://localhost:5000/api/users/admin/analytics
Headers: Authorization: Bearer <rider_token>
Expected: 403 Forbidden (riders can't access admin routes)
```

---

## 📊 Quick Reference

| Feature | Implementation |
|---------|----------------|
| **Password Hashing** | bcrypt with 10 salt rounds |
| **Token Type** | JWT (JSON Web Tokens) |
| **Token Expiry** | 30 days |
| **Storage** | localStorage + Redux |
| **Roles** | rider, driver, admin |
| **Statuses** | active, blocked, suspended, pending |
| **Min Password Length** | 6 characters |

---

## ✅ Quick Start

1. **Start servers:**
   ```bash
   # Frontend
   cd frontend && npm run dev
   
   # Backend  
   cd backend && npm run dev
   ```

2. **Login at:** http://localhost:5173/login

3. **Use credentials:**
   - **Rider:** rider@riderapp.com / rider123
   - **Driver:** driver@riderapp.com / driver123
   - **Admin:** admin@riderapp.com / admin123

4. **Start testing!** 🚀

---

## 💡 Pro Tips

- 🔐 **Never** commit real passwords or JWT secrets to git
- 🔄 Change default passwords in production
- 🛡️ Use strong JWT secrets (32+ characters)
- 📝 Implement rate limiting on login endpoint
- 🔒 Add 2FA for admin accounts in production
- 📊 Log all login attempts for security auditing

---

**Authentication system is ready to use!** ✅
