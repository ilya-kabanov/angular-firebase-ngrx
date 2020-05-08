import { createAction, props } from '@ngrx/store';
import { User } from '../models/auth';

export const loadCores = createAction('[Core] Load Cores');

export const getUser = createAction('[Core] Get User');

export const authenticated = createAction(
  '[Core] Authenticated',
  props<{ user: User }>()
);

export const notAuthenticated = createAction('[Core] Not Authenticated');

export const loginAnonymously = createAction('[Core] Login Anonymously');

export const logout = createAction('[Core] Logout');
