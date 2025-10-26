import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; token: string }>()
);

export const logout = createAction(
  '[Auth] Logout'
);
