import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DynamicBackground } from './components/layout/DynamicBackground';

// Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Features } from './pages/public/Features';
import { Contact } from './pages/public/Contact';
import { FAQ } from './pages/public/FAQ';
import { NotFound } from './pages/public/NotFound';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Dashboard Pages
import { RiderDashboard } from './pages/dashboard/RiderDashboard';
import { RideHistory } from './components/features/rider/RideHistory';
import { DriverDashboard } from './pages/dashboard/DriverDashboard';
import { DriverEarnings } from './components/features/driver/DriverEarnings';
import { DocumentUpload } from './components/features/driver/DocumentUpload';
import { DriverReviews } from './components/features/driver/DriverReviews';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { AdminUsers } from './components/features/admin/AdminUsers';
import { AdminRides } from './components/features/admin/AdminRides';
import { AdminAnalytics } from './components/features/admin/AdminAnalytics';
import { AdminDisputes } from './components/features/admin/AdminDisputes';
import { ProfileSettings } from './components/features/common/ProfileSettings';

// Layout Wrappers
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen relative">
    <DynamicBackground />
    <Navbar />
    <main className="flex-grow">
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
              {/* Rider Routes */}
              <Route path="rider" element={<RiderDashboard />} />
              <Route path="rider/history" element={<RideHistory />} />
              <Route path="rider/profile" element={<ProfileSettings />} />

              {/* Driver Routes */}
              <Route path="driver" element={<DriverDashboard />} />
              <Route path="driver/requests" element={<DriverDashboard />} /> 
              <Route path="driver/earnings" element={<DriverEarnings />} />
              <Route path="driver/documents" element={<DocumentUpload />} />
              <Route path="driver/history" element={<RideHistory />} /> 
              <Route path="driver/reviews" element={<DriverReviews />} />
              <Route path="driver/profile" element={<ProfileSettings />} />

              {/* Admin Routes */}
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route path="admin/rides" element={<AdminRides />} />
              <Route path="admin/disputes" element={<AdminDisputes />} />
              <Route path="admin/analytics" element={<AdminAnalytics />} />
              <Route path="admin/settings" element={<ProfileSettings />} />
            </Route>
            
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
