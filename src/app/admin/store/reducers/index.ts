import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { selectUserList, userListReducer, UserListState } from './users-list';

export interface AdminState {
  userList: UserListState;
}

export const reducers: ActionReducerMap<AdminState> = {
  userList: userListReducer,
};
export const metaReducers: MetaReducer<AdminState>[] = environment.production ? [] : [];

const selectStateUserList = (state: AdminState) => state.userList;
export const selectUsersList = createSelector(selectStateUserList, selectUserList);
