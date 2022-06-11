import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { initialSpinnerState, isSpinnerActive, spinnerReducer, SpinnerState } from './spinner';
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
  spinner: SpinnerState;
}
const initialState: State = {
  user: initialUserState,
  spinner: initialSpinnerState,
};

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  spinner: spinnerReducer,
};
export const metaReducers: MetaReducer<State>[] = environment.production ? [] : [];

// Spinner selectors
export const selectStateSpinner = (state: State) => state.spinner;
export const selectSpinnerActive = createSelector(selectStateSpinner, isSpinnerActive);

// Users Selectors
export const selectStateUser = (state: State) => state.user;
export const selectUser = createSelector(selectStateUser, getUser);
export const selectOwnerId = createSelector(selectStateUser, getOwnerId);
export const selectIsAuthenticated = createSelector(selectStateUser, isOwnerAuthenticated);
export const selectLoginError = createSelector(selectStateUser, getLoginError);
