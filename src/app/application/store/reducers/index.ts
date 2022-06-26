import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { environment } from 'src/environments/environment';
import { getPermissions, permissionsReducer, PermissionsState } from './permissions';
import { getLoginError, getOwnerId, getUser, isAuthenticated, userReducer, UserState } from './users';

export const APPLICATION_FEATURE_KEY = 'application';
export interface ApplicationState {
  user: UserState;
  permissions: PermissionsState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  user: userReducer,
  permissions: permissionsReducer,
};
export const metaReducers: MetaReducer<ApplicationState>[] = environment.production ? [] : [];

const selectFeatureApplication = createFeatureSelector<RootState, ApplicationState>(APPLICATION_FEATURE_KEY);

// Users Selectors
const selectStateUser = createSelector(selectFeatureApplication, (state: ApplicationState) => state.user);
export const selectUser = createSelector(selectStateUser, getUser);
export const selectOwnerId = createSelector(selectStateUser, getOwnerId);
export const selectIsAuthenticated = createSelector(selectStateUser, isAuthenticated);
// export const selectIsAuthenticatedNonNull = createSelector(selectIsAuthenticated, (auth) =>
//   auth === null ? false : auth
// );
export const selectLoginError = createSelector(selectStateUser, getLoginError);

const selectStatePermissions = createSelector(selectFeatureApplication, (state: ApplicationState) => state.permissions);
export const selectPermissions = createSelector(selectStatePermissions, getPermissions);
export const hasPermission = (resource: string, action: string) =>
  createSelector(selectPermissions, (permissions) => {
    console.log('My permissions', permissions);
    if (permissions === null) return null;
    return permissions.find((permission) => permission.resourceName === resource)?.actions?.includes(action) ?? false;
  });
