# Ride Management System - Technical Documentation
**Version:** 1.0.0 | **Date:** December 27, 2025  
**Status:** Production Ready

---

## 1. Executive Summary

**Product Name:** Velox Ride Management System (RMS)  
**Category:** SaaS Urban Mobility Platform  

**Problem Statement:**  
Urban transportation markets are fragmented, often plagued by opaque pricing, lack of safety features, and inefficient dispatch systems. Traditional ride-hailing solutions can be rigid and difficult to customize for specific regional needs.

**Solution Overview:**  
Velox RMS is a comprehensive, white-label capable SaaS platform designed to streamline ride booking, driver management, and fleet administration. It provides a seamless, real-time connection between riders and drivers while offering administrators powerful oversight tools.

**Target Market:**  
*   Independent Ride-Hailing Startups
*   Corporate Fleet Managers
*   Urban Transit Authorities

**Key Value Propositions:**  
*   **Transparency:** Real-time fare estimation and tracking.
*   **Safety First:** Integrated SOS and emergency contact systems.
*   **Operational Efficiency:** Automated dispatch and driver status management.
*   **Scalability:** built on a modular MERN stack architecture.

---

## 2. Product Overview

Velox is a role-based web application accessible across desktop, tablet, and mobile devices via modern web browsers.

**Core User Roles:**
1.  **Rider:** The end-user who requests rides, tracks drivers, and makes payments.
2.  **Driver:** The service provider who accepts requests, manages availability, and tracks earnings.
3.  **Admin:** The system overseer who manages users, monitors platform activity, and resolves disputes.

**Platform Support:**  
*   **Web:** Fully responsive Progressive Web App (PWA) behavior.
*   **Mobile:** Optimized for iOS Safari and Android Chrome.

---

## 3. Technology Stack

### Frontend
*   **Core Framework:** React 18 (TypeScript)
*   **State Management:** Redux Toolkit & RTK Query
*   **Routing:** React Router v6
*   **Styling:** Tailwind CSS (Utility-first) + Custom Glassmorphism Design System
*   **Motion:** Framer Motion (Animations)
*   **Visualization:** Recharts (Analytics)
*   **Feedback:** React Hot Toast
*   **Build Tool:** Vite

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (via Mongoose ODM)
*   **Authentication:** JWT (JSON Web Tokens)
*   **Security:** bcrypt (Hashing), Helmet (Headers), CORS
*   **Validation:** Zod (Strict Schema Validation)

### Infrastructure
*   **Version Control:** Git & GitHub
*   **Deployment:** 
    *   **Frontend:** Vercel (Edge Network)
    *   **Backend:** Render (Auto-scaling Node.js services)
*   **Environment:** Strict separation of Development (`.env.local`) and Production variables.

---

## 4. System Architecture

The system follows a **Monolithic Repository (Monorepo) structure** with decoupled services for Frontend and Backend.

**Data Flow:**
1.  **Client Layer:** React Client initiates requests via `RTK Query` endpoints.
2.  **API Gateway:** Express.js server receives requests, applies `Helmet` security and `CORS` policies.
3.  **Auth Layer:** `authMiddleware` verifies JWT tokens attached to headers.
4.  **Controller Layer:** Business logic processes the request (e.g., `rideController`).
5.  **Data Layer:** Mongoose models interact with the MongoDB Atlas cluster.
6.  **Response:** JSON data is sanitized and returned to the client.

---

## 5. Environment Configuration

### Development
*   **URL:** `http://localhost:5173` (Frontend), `http://localhost:5000` (Backend)
*   **Database:** Local MongoDB instance or Dev Cluster.

### Production
*   **URL:** Live Vercel/Render URLs.
*   **Database:** MongoDB Atlas Production Cluster (Replica Set).
*   **Variables:**
    *   `VITE_API_URL`: Backend API endpoint.
    *   `MONGODB_URI`: Connection string.
    *   `JWT_SECRET`: 256-bit encryption key.
    *   `NODE_ENV`: 'production'

---

## 6. Public Website Pages

| Page Name | Description |
| :--- | :--- |
| **Home** | High-impact Landing Page with Hero, How-it-works, and CTA sections. |
| **About Us** | Corporate mission, team introduction, and integrity statements. |
| **Features** | Detailed breakdown of capabilities for Riders, Drivers, and Admins. |
| **Contact** | Support inquiry form with validation. |
| **FAQ** | Searchable knowledge base for common user questions. |

---

## 7. Authentication & Authorization

**Security Protocol:**
*   **Registration:** Users select a role (`rider` or `driver`) during sign-up. Zod validates email format and password strength (min 8 chars).
*   **Login:** Returns a generic JWT signed with `HS256`.
*   **Persistence:** Tokens are stored in Redux State (memory) and `localStorage` (optional) or HttpOnly cookies for session persistence.
*   **Access Control:**
    *   `protect`: Verifies valid token.
    *   `authorize('admin')`: Restricts route to specific roles.

---

## 8. Rider Module Documentation

*   **Ride Request:**
    *   Input Pickup & Destination.
    *   System calculates distance and estimates fare.
*   **Live Tracking:**
    *   Visual map representation of Driver's location relative to Pickup.
    *   Floating **SOS Button** available during active rides.
*   **History:**
    *   Complete list of past trips with status (Completed, Cancelled).
*   **Safety:**
    *   **SOS Feature:** Triggers "Notify Contacts", "Call Police", or "Share Location".

---

## 9. Driver Module Documentation

*   **Status Control:**
    *   **Online:** Visible to dispatch system.
    *   **Offline:** Hides driver from new requests; allows access to earnings/history.
*   **Ride Lifecycle:**
    *   Incoming Request notification card.
    *   Accept -> In Transit -> Complete workflow.
*   **Analytics:**
    *   Weekly Earnings Chart (Area Chart).
    *   Daily Trip Summary (Trips, Online Time, Revenue).

---

## 10. Admin Module Documentation

*   **Dashboard:**
    *   High-level metrics: Total Revenue, Active Users, Total Rides.
*   **User Management:**
    *   Table view of all users.
    *   Action to **Block/Unblock** users (revokes access immediately).
*   **Ride Oversight:**
    *   Monitor all active rides in the system.

---

## 11. URLs & Live Links

*   **Frontend (Live):** [Insert Vercel URL Here]
*   **Backend API (Live):** [Insert Render URL Here]
*   **Local Test:** `http://localhost:5173`

---

## 12. Frontend Documentation

**Repository:** `/frontend`  
**Key Libraries:**
*   `@reduxjs/toolkit` - Global State
*   `framer-motion` - UI Animations
*   `react-hook-form` - Form Management
*   `zod` - Validation Schemas

**Build Process:**
```bash
npm install
npm run build # Generates /dist folder
```

---

## 13. Backend Documentation

**Repository:** `/backend`  
**Key Libraries:**
*   `express` - Web Server
*   `mongoose` - ODM
*   `jsonwebtoken` - Auth

**Error Handling:**
*   `errorHandler` middleware catches async errors and returns structured JSON `{ message, stack }`.

---

## 14. API Documentation Summary

**Auth Endpoints:**
*   `POST /api/auth/register` - Create account
*   `POST /api/auth/login` - Authenticate & Get Token

**Ride Endpoints:**
*   `POST /api/rides/request` - Initiate Ride (Rider)
*   `PUT /api/rides/:id/accept` - Accept Ride (Driver)
*   `GET /api/rides` - Get History

**User Endpoints:**
*   `GET /api/users/profile` - Get User Data
*   `PUT /api/users/:id/status` - Block/Unblock (Admin)

---

## 15. Database Documentation

**Type:** NoSQL (MongoDB)  
**Schema Design:**
*   **Users Collection:** Stores Auth data, Roles, Safety Settings.
    *   *Index:* `email` (Unique)
*   **Rides Collection:** Stores Trip data, Locations, Status.
    *   *Index:* `riderId`, `driverId`

---

## 16. Video Resources

*   **Full System Demo:** [Link to Loom/YouTube]
*   **Rider Flow Walkthrough:** [Link]
*   **Driver Flow Walkthrough:** [Link]

---

## 17. Credentials (Testing Only)

**Admin:**
*   Email: `admin@velox.com`
*   Pass: `admin123`

**Driver:**
*   Email: `driver@velox.com`
*   Pass: `driver123`

**Rider:**
*   Email: `rider@velox.com`
*   Pass: `rider123`

---

## 18. UI/UX & Performance

*   **Design System:** Glassmorphism (Blur effects, Translucent backgrounds).
*   **Performance:** Code-splitting via `React.lazy` on all dashboard routes.
*   **Loading States:** Custom `LoadingSpinner` for suspense fallbacks.

---

## 19. Error Handling & Validation

*   **Forms:** All inputs validated against Zod schemas. Error messages displayed below inputs.
*   **API:** 401 (Unauthorized), 403 (Forbidden), and 500 (Server Error) are handled gracefully with Toast notifications.

---

## 20. Security Practices

1.  **Password Hashing:** `bcryptjs` with salt rounds.
2.  **Environment Protection:** `.env` files git-ignored.
3.  **Strict Typing:** TypeScript used end-to-end to prevent runtime type errors.

---

## 21. Deployment & DevOps

**CI/CD Pipeline:**
*   GitHub Actions (Optional) -> Build -> Deploy to Vercel/Render.
*   **Rollback:** Instant rollback available via Vercel Dashboard previous deployments.

---

## 22. Testing Strategy

*   **Unit Tests:** Jest (Backend Models).
*   **Manual Testing:** "5-Time" Rigorous verification of Auth loops and Ride cycles.
*   **Edge Cases:** Verified offline driver behavior and blocked user access.

---

## 23. Known Limitations

*   **Maps:** Currently uses a mocked map visualization; requires Google Maps API Key for production live tracking.
*   **Payments:** Stripe integration is stubbed; requires API keys.

---

## 24. Future Enhancements

*   **Mobile App:** React Native port for native iOS/Android experience.
*   **AI Estimations:** Machine learning model for dynamic pricing based on demand.
*   **Wallet:** Integrated digital wallet for rider credits.

---

## 25. Handover & Maintenance

**Ownership:** [Client Name / Agency]  
**Maintenance:**  
1.  Monitor `npm audit` for security patches.
2.  Rotate `JWT_SECRET` every 90 days.
3.  Back up MongoDB Atlas daily.

---

## 26. Appendix

**Glossary:**
*   **RMS:** Ride Management System.
*   **JWT:** JSON Web Token (Auth Standard).
*   **Glassmorphism:** UI design trend emphasizing transparency.

---
*Documentation Generated by Antigravity AI*
