// ============================================================================
// AUTH UTILITIES
// Purpose: Shared authentication helper functions
// These functions are separated from ProtectedRoute.tsx to maintain
// React Fast Refresh compatibility (ESLint: react-refresh/only-export-components)
// ============================================================================

export interface UserData {
  token: string;
  expiresAt?: number; // Token expiration timestamp (Unix milliseconds)
  role?: "user" | "admin";
  // ... other user properties
}

// ============================================================================
// TOKEN EXPIRATION CHECK
// ============================================================================
// Check if token has expired based on expiresAt timestamp
export function isTokenExpired(user: UserData): boolean {
  if (!user.expiresAt) {
    return false; // No expiration set, token is valid
  }
  return Date.now() > user.expiresAt;
}

// ============================================================================
// TOKEN & USER DATA HELPERS
// ============================================================================
export function getAuthToken(): string | null {
  // Check localStorage first (current implementation)
  const token = localStorage.getItem("token");
  if (token) return token;

  // Future: Check HTTP-only cookie (requires backend support)
  // const cookieToken = getCookie("authToken");
  // return cookieToken;

  return null;
}

export function getUserData(): UserData | null {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as UserData;
  } catch {
    return null;
  }
}

// ============================================================================
// ROLE CHECK
// ============================================================================
// Check if user has required role for the route
export function hasRequiredRole(
  user: UserData,
  requiredRole?: "user" | "admin",
): boolean {
  if (!requiredRole) return true; // No role required
  return user.role === requiredRole;
}

// ============================================================================
// LOGOUT FUNCTION
// ============================================================================
// Logout function - clears all auth data
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Future: Clear HTTP-only cookie
  // deleteCookie("authToken");
  window.location.href = "/login";
}

// ============================================================================
// AUTH STATUS CHECKS
// ============================================================================
// Check if user is currently logged in
export function isLoggedIn(): boolean {
  const token = getAuthToken();
  const user = getUserData();

  if (!token || !user) return false;
  if (isTokenExpired(user)) return false;

  return true;
}

// Get current user role
export function getUserRole(): "user" | "admin" | null {
  const user = getUserData();
  return user?.role || null;
}
