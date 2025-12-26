# Velox - Next Gen Ride Booking Platform

Velox is a production-grade, full-stack capable frontend for a ride-booking platform, built with modern web technologies. It features a stunning, dynamic UI with 3D effects, role-based access control, and real-time state management.

## 🚀 Live Demo
[Insert Deployment Link Here]

## ✨ Key Features

### 🎨 UI/UX
- **Dynamic "Aurora" Backgrounds**: Fluid, animated backgrounds that adapt to light/dark modes.
- **3D Tilt Cards**: Interactive elements that respond to mouse movement.
- **Glassmorphism**: Premium frosted glass aesthetics throughout the application.
- **Dark Mode**: Fully supported system-wide dark mode.
- **Responsive Design**: Flawless experience on Mobile, Tablet, and Desktop.

### 👥 User Roles
1. **Rider**: 
   - Book rides with fare estimation.
   - View ride history.
   - SOS Emergency Button for safety.
2. **Driver**:
   - Online/Offline availability toggle.
   - Real-time incoming ride requests.
   - Earnings dashboard with interactive charts.
3. **Admin**:
   - User management (Riders/Drivers).
   - System analytics and oversight.

### 🛠 Tech Stack
- **Framework**: React 18 + Vite (SPA Architecture)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Custom Animations
- **State Management**: Redux Toolkit
- **Motion**: Framer Motion (3D Effects, Transitions)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form

## 📂 Project Structure

\`\`\`
src/
├── components/
│   ├── features/       # Role-specific components (Rider/Driver/Admin)
│   ├── layout/         # Layout components (Navbar, Sidebar, Background)
│   └── ui/             # Reusable UI kit (Buttons, Inputs, Cards, Modals)
├── context/            # Global contexts (Theme)
├── lib/                # Utilities (cn, formatters)
├── pages/              # Page components
│   ├── auth/           # Login/Register
│   ├── dashboard/      # Protected dashboard views
│   └── public/         # Landing pages
├── store/              # Redux setup
└── App.tsx             # Main router configuration
\`\`\`

## 🚦 Getting Started

1. **Install Dependencies**
   \`\`\`bash
   yarn install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   yarn run dev
   \`\`\`

3. **Build for Production**
   \`\`\`bash
   yarn build
   \`\`\`

## 🔐 Authentication (Demo Mode)

Since this is a frontend demo, authentication is simulated. Use any email to "register".
- **Rider Role**: Login with any email (default).
- **Driver Role**: Login with email containing "driver" (e.g., `driver@test.com`).
- **Admin Role**: Login with email containing "admin" (e.g., `admin@test.com`).

## 🛡 Security & Safety
- **SOS Feature**: A floating emergency button is available for Riders and Drivers during active trips, simulating integration with emergency services.
- **Protected Routes**: Dashboard routes are guarded by an authentication wrapper.

## 📄 License
MIT License - Free for academic and portfolio use.
