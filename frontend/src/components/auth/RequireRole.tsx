import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface RequireRoleProps {
  allowedRoles: string[];
  children?: React.ReactNode;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect unprivileged users to their appropriate home dashboard
    const defaultDashboard = user?.role ? `/dashboard/${user.role}` : '/login';
    return <Navigate to={defaultDashboard} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
