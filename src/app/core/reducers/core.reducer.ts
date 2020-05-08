import { Action, createReducer, on } from '@ngrx/store';
import * as CoreActions from '../actions/core.actions';
import { User } from '../models/auth';

export const coreFeatureKey = 'core';

export interface State {
  user: User | null;
  isLoading: boolean;
}

export const initialState: State = {
  user: null,
  isLoading: true,
};

export const reducer = createReducer(
  initialState,
  on(CoreActions.getUser, (state) => ({ ...state, isLoading: true })),
  on(CoreActions.authenticated, (state, payload) => ({
    ...state,
    isLoading: false,
    user: payload.user,
  })),
  on(CoreActions.notAuthenticated, () => ({ ...initialState, isLoading: false })),
  on(CoreActions.loginAnonymously, (state) => ({ ...state, isLoading: true })),
  on(CoreActions.logout, (state) => ({ ...state, isLoading: true }))
);
