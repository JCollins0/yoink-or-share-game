import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { environment } from 'src/environments/environment';
import { selectUserList, userListReducer, UserListState } from './users-list';

export const ADMIN_FEATURE_KEY = 'admin';

export interface AdminState {
  userList: UserListState;
}
export const reducers: ActionReducerMap<AdminState> = {
  userList: userListReducer,
};
export const metaReducers: MetaReducer<AdminState>[] = environment.production ? [] : [];

const selectAdminState = createFeatureSelector<RootState, AdminState>(ADMIN_FEATURE_KEY);

const selectStateUserList = createSelector(selectAdminState, (state: AdminState) => state.userList);
export const selectUsersList = createSelector(selectStateUserList, selectUserList);
