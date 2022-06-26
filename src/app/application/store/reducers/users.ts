import { createReducer, on } from '@ngrx/store';
import {
  LoginSuccess,
  LoginFailure,
  LogoutSuccess,
  IsAuthenticatedSuccess,
  IsAuthenticatedFailure,
} from '../actions/app.actions';
import { CommonError } from 'src/app/shared/models';
import { User } from 'src/app/shared/models';

export interface UserState {
  user: User | null;
  error: CommonError | null;
  isAuthenticated: boolean;
}
const initialUserState: UserState = {
  user: null,
  error: null,
  isAuthenticated: false,
};

export const userReducer = createReducer(
  initialUserState,
  on(LoginSuccess, (state: UserState, { user }) => ({ isAuthenticated: true, user: user, error: null })),
  on(LoginFailure, (state: UserState, { error }) => ({ isAuthenticated: false, user: null, error: error })),
  on(LogoutSuccess, (state: UserState) => ({ isAuthenticated: false, user: null, error: null })),
  on(IsAuthenticatedSuccess, (state: UserState, action) => ({ ...state, isAuthenticated: action.authenticated })),
  on(IsAuthenticatedFailure, (state: UserState) => ({ ...state, isAuthenticated: false }))
);

export const getUser = (state: UserState) => state.user;
export const getOwnerId = (state: UserState) => (!state.user ? -1 : state.user.userId);
export const isAuthenticated = (state: UserState) => state.isAuthenticated;
export const getLoginError = (state: UserState) => state.error;
