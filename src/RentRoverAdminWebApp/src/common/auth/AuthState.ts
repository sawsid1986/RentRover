export interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  // Add other auth-related fields as needed (e.g., user info)
}
