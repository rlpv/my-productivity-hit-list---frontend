// ============================================================================
// AUTH UTILITIES
// Purpose: Shared authentication helper functions
// These functions are separated from ProtectedRoute.tsx to maintain
// React Fast Refresh compatibility (ESLint: react-refresh/only-export-components)
// ============================================================================

// Note: Token is stored in both HttpOnly cookie AND localStorage
// Cookie is used for main auth, localStorage as backup
export interface UserData {
  _id?: string;
  username?: string;
  email?: string;
  token?: string;
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
  // First try to get from localStorage (backup)
  const token = localStorage.getItem("token");
  if (token) return token;

  // Token in HttpOnly cookie cannot be accessed by JavaScript
  // Browser sends it automatically with requests
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
  // Cookie is cleared by backend API call in HamburgerMenu
  window.location.href = "/login";
}

// ============================================================================
// AUTH STATUS CHECKS
// ============================================================================
// Check if user is currently logged in
export function isLoggedIn(): boolean {
  // Check if user data exists in localStorage
  // Token is in HttpOnly cookie and sent automatically with requests
  // localStorage token is used as backup
  const user = getUserData();

  if (!user) return false;
  if (isTokenExpired(user)) return false;

  return true;
}

// Get current user role
export function getUserRole(): "user" | "admin" | null {
  const user = getUserData();
  return user?.role || null;
}
