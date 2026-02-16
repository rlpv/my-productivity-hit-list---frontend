// ============================================================================
// PROTECTED ROUTE COMPONENT
// Purpose: Prevent unauthorized users from accessing protected pages
//
// Features implemented:
// 1. Auto-logout on token expiration
// 2. HTTP-only cookies support (backend required for full implementation)
// 3. Route-level permission checks (role-based access control)
// ============================================================================

import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  getAuthToken,
  getUserData,
  hasRequiredRole,
  isTokenExpired,
} from "../utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin"; // Optional: specify required role
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      // Get token and user data
      const token = getAuthToken();
      const user = getUserData();

      // 1. Check if token exists
      if (!token || !user) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthorized(false);
        return;
      }

      // 1. Check if token has expired (auto-logout)
      if (isTokenExpired(user)) {
        // Token expired - clear storage and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthorized(false);
        return;
      }

      // 3. Check if user has required role
      if (!hasRequiredRole(user, requiredRole)) {
        // User doesn't have required role
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);
    };

    checkAuth();
  }, [location.pathname, requiredRole]);

  // Show nothing while checking (can be replaced with a loading spinner)
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

// ============================================================================
// USAGE EXAMPLE IN App.tsx (copy to App.tsx and uncomment):
// ============================================================================
//
// import ProtectedRoute from "./components/ProtectedRoute";
//
// function App() {
//   return (
//     <Routes>
//       {/* Public Routes - No authentication required */}
//       <Route path="/" element={<Landingpage />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/forgotpass" element={<Forgotpass />} />
//       <Route path="/termscond" element={<Termscond />} />
//       <Route path="/verifycode" element={<Verifycode />} />
//       <Route path="/setnewpass" element={<Setnewpass />} />
//
//       {/* Protected Routes - Require authentication */}
//       <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
//       <Route path="/addtask" element={<ProtectedRoute><Addtask /></ProtectedRoute>} />
//       <Route path="/edittask/:id" element={<ProtectedRoute><Edittask /></ProtectedRoute>} />
//       <Route path="/changepass" element={<ProtectedRoute requiredRole="user"><Changepass /></ProtectedRoute>} />
//
//       {/* Admin-only route example */}
//       <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPanel /></ProtectedRoute>} />
//     </Routes>
//   );
// }
