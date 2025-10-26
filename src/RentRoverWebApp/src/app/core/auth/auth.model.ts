export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  username: null,
  token: null
}  
