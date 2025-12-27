# Rider App - Premium Urban Mobility Platform

A high-fidelity, production-grade ride-hailing application featuring a comprehensive **Rider**, **Driver**, and **Admin** experience. Built with a modern tech stack and designed with a premium, glassmorphism-inspired UI.

## 🚀 Live Public Pages
Explore the premium public-facing pages:
- **Home**: [http://localhost:5173/](http://localhost:5173/) - Immersive landing page.
- **Features**: [http://localhost:5173/features](http://localhost:5173/features) - Role-specific feature breakdowns.
- **About Us**: [http://localhost:5173/about](http://localhost:5173/about) - Mission, team, and stats.
- **Contact**: [http://localhost:5173/contact](http://localhost:5173/contact) - 24/7 Support form.
- **FAQ**: [http://localhost:5173/faq](http://localhost:5173/faq) - Common questions and search.

## 🔐 Authentication
- **Login**: [http://localhost:5173/login](http://localhost:5173/login)
- **Register**: [http://localhost:5173/register](http://localhost:5173/register)

## 📊 Feature-Rich Dashboards
Access role-protected dashboards (Login required):

### 1. Rider Dashboard (`/dashboard/rider`)
- **Book a Ride**: Intuitive destination search and vehicle selection.
- **Active Ride**: Real-time tracking and floating **SOS Button** for safety.
- **History**: View past trips and receipts.

### 2. Driver Dashboard (`/dashboard/driver`)
- **Earnings**: Real-time charts visualizing weekly/monthly income.
- **Status Toggle**: Go Online/Offline instantly.
- **Requests**: Accept or reject incoming ride requests in real-time.

### 3. Admin Dashboard (`/dashboard/admin`)
- **Analytics**: System-wide revenue, user growth, and ride volume.
- **User Management**: Monitor and block/unblock users.
- **Live Map**: Real-time visualization of the entire fleet.

---

## 🛠️ Technology Stack

### Frontend (`/frontend`)
- **Framework**: React 18 + Vite (TypeScript)
- **State Management**: Redux Toolkit & RTK Query
- **Styling**: Tailwind CSS + Custom Design System (Glassmorphism)
- **Animations**: Framer Motion (Page transitions, scroll effects)
- **Maps**: Recharts (Analytics) & Custom Map Components

### Backend (`/backend`)
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens) with secure HttpOnly cookies
- **Validation**: Zod (Strict schema validation)

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository**
2.  **Start the Backend**:
    ```bash
    cd backend
    npm install
    npm run dev
    # Server running on http://localhost:5000
    ```
3.  **Start the Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    # Client running on http://localhost:5173
    ```

## ✨ "Premium" Design Philosophy
This project adheres to a "Best All Over" quality standard:
- **Zero Console Errors**: Strict typing and linting checks passed.
- **Glassmorphism**: Consistent use of backdrop blur, translucent layers, and subtle borders.
- **Motion**: Smooth entrance animations (Framer Motion) on every page.
- **Accessibility**: Semantic HTML and keyboard navigation support.

---

**Developed with ❤️ and Code**
