import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';
import { initialAuthState } from './auth.model';

export const authReducer = createReducer(
  initialAuthState,

  on(login, (state, { username, token }) => {
    return {
      ...state,
      isAuthenticated: true,
      username,
      token
    }
  }),

  on(logout, (state) => {
    return initialAuthState
  })
);
