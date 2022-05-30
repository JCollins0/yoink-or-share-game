import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import {
  getLoginError,
  getOwnerId,
  getUser,
  initialUserState,
  isOwnerAuthenticated,
  userReducer,
  UserState,
} from './users';

export interface State {
  user: UserState;
}
const initialState: State = {
  user: initialUserState,
};

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
};
export const metaReducers: MetaReducer<State>[] = environment.production ? [] : [];

export const selectStateUser = (state: State) => state.user;

export const selectUser = createSelector(selectStateUser, getUser);

export const selectOwnerId = createSelector(selectStateUser, getOwnerId);

export const selectIsAuthenticated = createSelector(selectStateUser, isOwnerAuthenticated);

export const selectLoginError = createSelector(selectStateUser, getLoginError);
