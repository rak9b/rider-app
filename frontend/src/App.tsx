import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Layouts
import { Navbar } from './components/layout/Navbar';
import { AIChatbot } from './components/features/common/AIChatbot';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DynamicBackground } from './components/layout/DynamicBackground';
import { RequireRole } from './components/auth/RequireRole';

// Pages - Lazy Loaded
const Home = React.lazy(() => import('./pages/public/Home').then(module => ({ default: module.Home })));
const About = React.lazy(() => import('./pages/public/About').then(module => ({ default: module.About })));
const Features = React.lazy(() => import('./pages/public/Features').then(module => ({ default: module.Features })));
const Contact = React.lazy(() => import('./pages/public/Contact').then(module => ({ default: module.Contact })));
const FAQ = React.lazy(() => import('./pages/public/FAQ').then(module => ({ default: module.FAQ })));
const NotFound = React.lazy(() => import('./pages/public/NotFound').then(module => ({ default: module.NotFound })));
const Login = React.lazy(() => import('./pages/auth/Login').then(module => ({ default: module.Login })));
const Register = React.lazy(() => import('./pages/auth/Register').then(module => ({ default: module.Register })));

// Dashboard Pages - Lazy Loaded
const RiderDashboard = React.lazy(() => import('./pages/dashboard/RiderDashboard').then(module => ({ default: module.RiderDashboard })));
const RideHistory = React.lazy(() => import('./components/features/rider/RideHistory').then(module => ({ default: module.RideHistory })));
const DriverDashboard = React.lazy(() => import('./pages/dashboard/DriverDashboard').then(module => ({ default: module.DriverDashboard })));
const DriverEarnings = React.lazy(() => import('./components/features/driver/DriverEarnings').then(module => ({ default: module.DriverEarnings })));
const DocumentUpload = React.lazy(() => import('./components/features/driver/DocumentUpload').then(module => ({ default: module.DocumentUpload })));
const DriverReviews = React.lazy(() => import('./components/features/driver/DriverReviews').then(module => ({ default: module.DriverReviews })));
const AdminDashboard = React.lazy(() => import('./pages/dashboard/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminUsers = React.lazy(() => import('./components/features/admin/AdminUsers').then(module => ({ default: module.AdminUsers })));
const AdminRides = React.lazy(() => import('./components/features/admin/AdminRides').then(module => ({ default: module.AdminRides })));
const AdminAnalytics = React.lazy(() => import('./components/features/admin/AdminAnalytics').then(module => ({ default: module.AdminAnalytics })));
const AdminDisputes = React.lazy(() => import('./components/features/admin/AdminDisputes').then(module => ({ default: module.AdminDisputes })));
const ProfileSettings = React.lazy(() => import('./components/features/common/ProfileSettings').then(module => ({ default: module.ProfileSettings })));

// Layout Wrappers
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen relative">
    <DynamicBackground />
    <Navbar />
    <main className="flex-grow">
      <AIChatbot />
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Toaster
            position="top-center"
            toastOptions={{
              className: 'dark:bg-slate-800 dark:text-white glass',
              style: {
                background: 'rgba(30, 41, 59, 0.9)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
          <React.Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/features" element={<Features />} />
                <Route path="/faq" element={<FAQ />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<><DynamicBackground /><Login /></>} />
              <Route path="/register" element={<><DynamicBackground /><Register /></>} />

              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                {/* Rider Protected Routes */}
                <Route element={<RequireRole allowedRoles={['rider']} />}>
                  <Route path="rider" element={<RiderDashboard />} />
                  <Route path="rider/history" element={<RideHistory />} />
                  <Route path="rider/profile" element={<ProfileSettings />} />
                </Route>

                {/* Driver Protected Routes (BUG-005) */}
                <Route element={<RequireRole allowedRoles={['driver']} />}>
                  <Route path="driver" element={<DriverDashboard />} />
                  <Route path="driver/requests" element={<DriverDashboard />} />
                  <Route path="driver/earnings" element={<DriverEarnings />} />
                  <Route path="driver/documents" element={<DocumentUpload />} />
                  <Route path="driver/history" element={<RideHistory />} />
                  <Route path="driver/reviews" element={<DriverReviews />} />
                  <Route path="driver/profile" element={<ProfileSettings />} />
                </Route>

                {/* Admin Protected Routes (BUG-030) */}
                <Route element={<RequireRole allowedRoles={['admin']} />}>
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="admin/users" element={<AdminUsers />} />
                  <Route path="admin/rides" element={<AdminRides />} />
                  <Route path="admin/disputes" element={<AdminDisputes />} />
                  <Route path="admin/analytics" element={<AdminAnalytics />} />
                  <Route path="admin/settings" element={<ProfileSettings />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
