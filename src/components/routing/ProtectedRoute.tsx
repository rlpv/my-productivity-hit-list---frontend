// ============================================================================
// PROTECTED ROUTE - Route guard for authenticated pages
// ============================================================================

import { useAuthStore } from "@/store/authStore";
import {
  getAuthToken,
  getUserData,
  hasRequiredRole,
  isTokenExpired,
} from "@/utils/auth";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
}

// Main component that wraps protected content
export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const { isAuthenticated } = useAuthStore();

  // Check authorization on mount and when route changes
  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken();
      const user = getUserData();

      // Check if token exists
      if (!token || !user) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthorized(false);
        return;
      }

      // Check if token has expired
      if (isTokenExpired(user)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthorized(false);
        return;
      }

      // Check if user has required role
      if (!hasRequiredRole(user, requiredRole)) {
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);
    };

    checkAuth();
  }, [location.pathname, requiredRole, isAuthenticated]);

  // Show nothing while checking authorization
  if (isAuthorized === null) {
    return null;
  }

  // Not authorized - redirect to login
  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Authorized - render the protected content
  return <>{children}</>;
}
