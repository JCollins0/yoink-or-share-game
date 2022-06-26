import { createReducer, on } from '@ngrx/store';
import { CommonError, PermissionsMatrix } from 'src/app/shared/models';
import { GetPermissionsFailure, GetPermissionsSuccess, LogoutSuccess } from '../actions/app.actions';

export interface PermissionsState {
  permissions: PermissionsMatrix | null;
  error: CommonError | null;
}

const initialPermissionsState: PermissionsState = {
  permissions: null,
  error: null,
};

export const permissionsReducer = createReducer(
  initialPermissionsState,
  on(LogoutSuccess, (state) => ({ permissions: [], error: null })),
  on(GetPermissionsFailure, (state, action) => ({ permissions: [], error: action.error })),
  on(GetPermissionsSuccess, (state, action) => ({ permissions: action.permissions, error: null }))
);

export const getPermissions = (state: PermissionsState) => state.permissions;
