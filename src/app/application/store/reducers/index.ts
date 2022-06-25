import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { environment } from 'src/environments/environment';
import { getLoginError, getOwnerId, getUser, isOwnerAuthenticated, userReducer, UserState } from './users';

export const APPLICATION_FEATURE_KEY = 'application';
export interface ApplicationState {
  user: UserState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  user: userReducer,
};
export const metaReducers: MetaReducer<ApplicationState>[] = environment.production ? [] : [];

const selectFeatureApplication = createFeatureSelector<RootState, ApplicationState>(APPLICATION_FEATURE_KEY);

// Users Selectors
const selectStateUser = createSelector(selectFeatureApplication, (state: ApplicationState) => state.user);
export const selectUser = createSelector(selectStateUser, getUser);
export const selectOwnerId = createSelector(selectStateUser, getOwnerId);
export const selectIsAuthenticated = createSelector(selectStateUser, isOwnerAuthenticated);
export const selectLoginError = createSelector(selectStateUser, getLoginError);
